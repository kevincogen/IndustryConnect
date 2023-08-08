const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const cors = require('cors')

router.get('/:currentUserId', cors(), async (req, res) => {
  const currentUserId = req.params.currentUserId;

  if (!currentUserId) {
    return res.status(400).json({ error: 'User ID is missing' });
  }

  const query = `
    SELECT users.*, matches.id as match_id
    FROM users
    JOIN matches ON users.id = matches.user_id_1
    WHERE matches.user_id_2 = $1 AND users.id != $1

    UNION

    SELECT users.*, matches.id as match_id
    FROM users
    JOIN matches ON users.id = matches.user_id_2
    WHERE matches.user_id_1 = $1 AND users.id != $1;
  `;

  try {
    const result = await db.query(query, [currentUserId]);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
