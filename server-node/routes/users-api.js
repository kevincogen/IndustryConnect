/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

// retrieve specific user profile by authentication_id
router.get('/profile', async (req, res) => {
  const { authentication_id } = req.query;

  try {
    const userProfile = await userQueries.getUserProfileByAuthenticationId(authentication_id);
    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(404).json({ error: 'User not found' });
      }
  } catch (err) {
    console.error('Error retrieving user profile:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// create a new user profile
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, authentication_id, bio, education, experience, linkedin, twitter, github, facebook, website } = req.body;
  // Check if required fields are present
  if (!first_name || !last_name || !email || !authentication_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = await userQueries.createUserProfile(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error registering user -- From route:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user profile
router.put('/update', async (req, res) => {
  const { authentication_id } = req.body;

  if (!authentication_id) {
    return res.status(400).json({ error: 'authentication_id is required' });
  }

  try {
    const updatedUser = await userQueries.updateUserProfile(req.body);


    if(updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
