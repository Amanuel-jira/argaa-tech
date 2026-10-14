const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const adminAuth = require('../middleware/adminAuth');

// POST /api/contact - public: submit the contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, body } = req.body;
    if (!name || !email || !body) {
      return res.status(400).json({ error: 'name, email, and body are required' });
    }
    await pool.query(
      'INSERT INTO messages (name, email, subject, body) VALUES (?, ?, ?, ?)',
      [name, email, subject || null, body]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET /api/contact - admin only: view inbox
router.get('/', adminAuth, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  res.json(rows);
});

// PATCH /api/contact/:id/read - admin only: mark as read
router.patch('/:id/read', adminAuth, async (req, res) => {
  await pool.query('UPDATE messages SET is_read = TRUE WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
