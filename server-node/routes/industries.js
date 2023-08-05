const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Fetch all industries
router.get('/', async (req, res) => {
  const query = `
    SELECT * FROM industries;
  `;
  try {
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
