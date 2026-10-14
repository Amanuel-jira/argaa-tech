const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const adminAuth = require('../middleware/adminAuth');

// POST /api/questions - public: ask a question
router.post('/', async (req, res) => {
  try {
    const { name, email, question } = req.body;
    if (!question) return res.status(400).json({ error: 'question is required' });
    const [result] = await pool.query(
      'INSERT INTO questions (name, email, question) VALUES (?, ?, ?)',
      [name || null, email || null, question]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save question' });
  }
});

// GET /api/questions - public: list ANSWERED + public questions (for the FAQ page)
router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, question, answer, answered_at FROM questions
     WHERE answer IS NOT NULL AND is_public = TRUE
     ORDER BY answered_at DESC`
  );
  res.json(rows);
});

// GET /api/questions/all - admin only: every question, answered or not
router.get('/all', adminAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM questions ORDER BY created_at DESC');
  res.json(rows);
});

// PATCH /api/questions/:id - admin only: write/update the reply
router.patch('/:id', adminAuth, async (req, res) => {
  const { answer, is_public } = req.body;
  await pool.query(
    'UPDATE questions SET answer = ?, is_public = ?, answered_at = NOW() WHERE id = ?',
    [answer, is_public === false ? false : true, req.params.id]
  );
  res.json({ success: true });
});

module.exports = router;
