/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, authentication_id, bio, education, experience, linkedin, twitter, github, facebook, website } = req.body;
  console.log(req.body);
  // Check if required fields are present
  if (!first_name || !last_name || !email || !authentication_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = await userQueries.createUserProfile(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
