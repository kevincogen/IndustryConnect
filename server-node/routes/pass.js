const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.put('/', async (req, res) => {

  const authenticationId = req.headers['x-auth0-sub'];
  const userIdToPass = req.body.UserID;

  if (!authenticationId || !userIdToPass) {
    return res.status(400).json({ error: 'Authentication ID or User ID to pass is missing' });
  }

  const query = `
    UPDATE users
    SET passes = array_append(passes, $1)
    WHERE authentication_id = $2
    RETURNING passes;
  `;

  try {
    const result = await db.query(query, [userIdToPass, authenticationId]);
    return res.json(result.rows[0].passes);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
