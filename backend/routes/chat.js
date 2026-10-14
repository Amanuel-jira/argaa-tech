const express = require('express');
const router = express.Router();
const { askGemini } = require("../utils/gemini");

const SYSTEM_PROMPT = `You are the assistant on Argaa Tech Solutions' website, a web and app
development studio. Answer visitor questions about services (web development,
app development, product design), process, and how to get in touch. Keep
answers short and friendly. If asked something you don't know (specific
pricing, timelines, or details about the company you weren't told), say you're
not sure and suggest they use the contact form. Never make up client names or
project details that weren't given to you.`;

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }
    const reply = await askGemini({
      system: SYSTEM_PROMPT,
      messages,
      maxTokens: 500,
    });
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat request failed' });
  }
});

module.exports = router;
