const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.put('/', async (req, res) => {
  const user_id_1 = req.body.currentUser; // ID of current user
  const user_id_2 = req.body.userToConnect; // ID of user to connect

  console.log('Connecting users:', user_id_1, 'and', user_id_2); // Logging the input

  const query = `
    INSERT INTO matches (user_id_1, user_id_2) VALUES ($1, $2);
  `;
  try {
    const result = await db.query(query, [user_id_1, user_id_2]);
    console.log('Query result:', result); // Logging the result
    return res.json({ message: 'Match successfully created!' });
  } catch (err) {
    console.error('An error occurred:', err); // Logging the error
    return res.status(500).json({ error: "Internal Server Error"});
  }
})


module.exports = router;

//need to validate and sanitze?
//what if match already exists?
