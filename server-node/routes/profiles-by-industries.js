const express = require('express');
const router = express.Router();
const db = require('../db/connection');

//Filter users by industry
router.get('/:industryName', async (req, res) => {

  const industryNames= req.params.industryName.split('.'); // split the industries by comma
  // const authenticationId = req.headers['X-Auth0-Sub'];

  const authenticationId = req.headers['x-auth0-sub'];

  // Split the industryNames string into an array and then map it to PostgreSQL placeholders.
  // The map function uses the index to create placeholders
  // Example: If industryNames = "Tech,Health,Education", it maps to placeholders "$1,$2,$3".
  // These placeholders are used in the SQL query, with corresponding values in the array [...industryNames, authenticationId].
  const placeholders = industryNames.map((_, index) => `$${index + 1}`).join(',');
  const query = `
    SELECT *
    FROM users
    WHERE industry IN (${placeholders}) AND authentication_id <> $${industryNames.length +1};
  `;
  try {
    const { rows } = await db.query(query, [...industryNames, authenticationId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
