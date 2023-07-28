const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Fetch all users
router.get('/', async (req, res) => {
  const query = `
    SELECT * FROM users;
  `;
  try {
    const { rows } = await db.query(query);
    res.json(rows);
    console.log(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;


    // SELECT users.*, array_agg(DISTINCT industries.name) AS industries
    // FROM users
    // LEFT JOIN users_industries_rel ON users.id = users_industries_rel.user_id
    // LEFT JOIN industries ON users_industries_rel.industry_id = industries.id
    // WHERE users.authentication_id != $1
    // GROUP BY users.id;

// //Filter users by industry
// router.get('/api/profiles/industry/:industryName', async (req, res) => {
//   const { industryName } = req.params;
//   const authenticationId = req.user.sub;  // Make sure this is how you get the authentication id from your Auth0 user

//   const query = `
//     SELECT users.*, array_agg(DISTINCT industries.name) AS industries
//     FROM users
//     JOIN users_industries_rel ON users.id = users_industries_rel.user_id
//     JOIN industries ON users_industries_rel.industry_id = industries.id
//     WHERE industries.name = $1 AND users.authentication_id != $2
//     GROUP BY users.id;
//   `;
//   try {
//     const { rows } = await db.query(query, [industryName, authenticationId]);
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
