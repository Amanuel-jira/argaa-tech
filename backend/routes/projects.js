const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pool = require("../config/db");
const adminAuth = require("../middleware/adminAuth");

const uploadDir = path.join(__dirname, "..", "uploads", "projects");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("Only image files are allowed"));
    cb(null, true);
  },
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

// GET /api/projects - public: portfolio grid
router.get("/", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC",
  );
  res.json(rows);
});

// POST /api/projects - admin only: add previous work, with an optional image file
router.post("/", adminAuth, upload.single("image"), async (req, res) => {
  const { title, category, description, project_url, tags, sort_order } =
    req.body;
  if (!title) return res.status(400).json({ error: "title is required" });

  const image_url = req.file ? `/uploads/projects/${req.file.filename}` : null;

  const [result] = await pool.query(
    `INSERT INTO projects (title, category, description, image_url, project_url, tags, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      category || null,
      description || null,
      image_url,
      project_url || null,
      tags || null,
      sort_order || 0,
    ],
  );
  res.status(201).json({ success: true, id: result.insertId });
});

// PATCH /api/projects/:id - admin only: update fields and/or replace the image
router.patch('/:id', adminAuth, upload.single('image'), async (req, res) => {
  const { title, category, description, project_url, tags, sort_order } = req.body;
  const fields = [];
  const values = [];

  if (title !== undefined) { fields.push('title = ?'); values.push(title); }
  if (category !== undefined) { fields.push('category = ?'); values.push(category); }
  if (description !== undefined) { fields.push('description = ?'); values.push(description); }
  if (project_url !== undefined) { fields.push('project_url = ?'); values.push(project_url); }
  if (tags !== undefined) { fields.push('tags = ?'); values.push(tags); }
  if (sort_order !== undefined) { fields.push('sort_order = ?'); values.push(sort_order); }
  if (req.file) { fields.push('image_url = ?'); values.push(`/uploads/projects/${req.file.filename}`); }

  if (fields.length === 0) return res.status(400).json({ error: 'Nothing to update' });

  values.push(req.params.id);
  await pool.query(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values);
  res.json({ success: true });
});

// DELETE /api/projects/:id - admin only
router.delete('/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
