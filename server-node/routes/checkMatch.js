const express = require('express');
const router = express.Router();
const db = require('../db/connection');
console.log('CheckMatch route file loaded!');

router.get('/', async (req, res) => {
    const { profileId, userId } = req.query;
    console.log(req.query)

    if (!profileId || !userId) {
        return res.status(400).json({ error: 'Both profileId and userId are required.' });
    }

    try {
      const result = await db.query(`
          SELECT COUNT(*) AS count
          FROM users
          WHERE id = $1 AND connections @> ARRAY[$2::int]
      `, [profileId, userId]);

      // Assuming the database returns a count of matches. If count > 0, then there's a match.
      const isMatch = result.rows[0].count > 0;

      res.json({ isMatch });

  } catch (error) {
      console.error('Error checking for match:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }

});

router.get('/test', (req, res) => {
  res.send('Test route in checkMatch is working');
});


module.exports = router;
