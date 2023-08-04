const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.put('/', async (req, res) => {

  const authenticationId = req.headers['x-auth0-sub'];
  const userIdToConnect = req.body.UserID;

  if (!authenticationId || !userIdToConnect) {
    return res.status(400).json({ error: 'Authentication ID or User ID to connect is missing' });
  }

  const query = `
    UPDATE users
    SET connections = array_append(connections, $1)
    WHERE authentication_id = $2
    RETURNING connections;
  `;

  try {
    const result = await db.query(query, [userIdToConnect, authenticationId]);
    return res.json(result.rows[0].connections);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
