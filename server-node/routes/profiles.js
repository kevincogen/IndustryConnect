const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Fetch all users
router.get('/', async (req, res) => {
  const authenticationId = req.headers['x-auth0-sub'];
  const query = `
    SELECT * FROM users WHERE authentication_id <> $1;
  `;
  try {
    const { rows } = await db.query(query, [authenticationId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Fetch only Logged in User
router.get('/user', async (req, res) => {

  const authenticationId = req.headers['x-auth0-sub'];
  const query = `
    SELECT * FROM users WHERE authentication_id = $1;
  `;
  try {
    const { rows } = await db.query(query, [authenticationId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
