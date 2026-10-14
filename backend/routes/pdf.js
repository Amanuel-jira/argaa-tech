const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const pool = require('../config/db');
const adminAuth = require('../middleware/adminAuth');
const { askGemini } = require("../utils/gemini");
const { chunkText, topChunks } = require('../utils/chunk');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDF files are allowed'));
    cb(null, true);
  },
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

// POST /api/pdf/upload - admin only: upload the company PDF
router.post('/upload', adminAuth, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'pdf file is required' });

    const fileBuffer = fs.readFileSync(req.file.path);
    const parsed = await pdfParse(fileBuffer);

    // deactivate previous documents so only the newest is used for Q&A
    await pool.query('UPDATE pdf_documents SET is_active = FALSE');

    const [docResult] = await pool.query(
      'INSERT INTO pdf_documents (filename, original_name, is_active) VALUES (?, ?, TRUE)',
      [req.file.filename, req.file.originalname]
    );
    const documentId = docResult.insertId;

    const chunks = chunkText(parsed.text);
    for (let i = 0; i < chunks.length; i++) {
      await pool.query(
        'INSERT INTO pdf_chunks (document_id, chunk_index, content) VALUES (?, ?, ?)',
        [documentId, i, chunks[i]]
      );
    }

    res.status(201).json({ success: true, documentId, chunkCount: chunks.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});

// GET /api/pdf/active - is there a document loaded? (used by frontend to show/hide the widget)
router.get('/active', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT id, original_name, uploaded_at FROM pdf_documents WHERE is_active = TRUE LIMIT 1'
  );
  res.json(rows[0] || null);
});

// POST /api/pdf/ask - public: ask a question about the active PDF
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'question is required' });

    const [docs] = await pool.query('SELECT id, original_name FROM pdf_documents WHERE is_active = TRUE LIMIT 1');
    if (!docs.length) {
      return res.status(404).json({ error: 'No document has been uploaded yet' });
    }
    const doc = docs[0];

    const [chunks] = await pool.query(
      'SELECT content FROM pdf_chunks WHERE document_id = ? ORDER BY chunk_index ASC',
      [doc.id]
    );

    const relevant = topChunks(chunks, question, 4);
    const context = relevant.length
      ? relevant.join('\n\n---\n\n')
      : chunks.slice(0, 3).map((c) => c.content).join('\n\n---\n\n');

    const system = `You answer questions using ONLY the document excerpts provided below,
which come from a file called "${doc.original_name}". If the answer isn't in the
excerpts, say the document doesn't cover that and suggest the visitor use the
contact form. Be concise.

DOCUMENT EXCERPTS:
${context}`;

   const reply = await askGemini({
     system,
     messages: [{ role: "user", content: question }],
     maxTokens: 500,
   });

    res.json({ reply, source: doc.original_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to answer question' });
  }
});

module.exports = router;
