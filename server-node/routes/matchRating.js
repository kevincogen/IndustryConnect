const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.put('/:userId', async (req, res) => {
  // console.log("Body: ", req.body); // Should log { raterId: currentUserId, rating: newValue }
  // console.log("Params: ", req.params); // Should log { userId: ratedUserId }
  const { raterId, rating } = req.body;
  const ratedUserId = req.params.userId;

  if (!ratedUserId || !raterId || !rating) {
    // console.log("rating oops")
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    // 1. Insert the new rating into a ratings table.
    await db.query('INSERT INTO user_ratings (rated_user_id, rater_id, rating) VALUES ($1, $2, $3)', [ratedUserId, raterId, rating]);
    // console.log("1")
    // 2. Calculate the average rating.
    const result = await db.query('SELECT AVG(rating) as avg_rating FROM user_ratings WHERE rated_user_id = $1', [ratedUserId]);
    // console.log("2")
    // 3. Update the user's rating in the users table.
    const avg_rating = result.rows[0].avg_rating;
    await db.query('UPDATE users SET average_rating = $1 WHERE id = $2', [avg_rating, ratedUserId]);
    // console.log("3")
    // console.log('matchRating')
    return res.json({ status: 'Rating updated successfully', rating: avg_rating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
