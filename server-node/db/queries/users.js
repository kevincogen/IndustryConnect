const db = require('../connection');
const { Pool } = require('pg');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


const createUserProfile = async (userData) => {
  try {
    const { first_name, last_name, email, authentication_id, ...fieldsToUpdate } = userData;
    const fieldNames = ['first_name', 'last_name', 'email', 'authentication_id'];
    const values = [first_name, last_name, email, authentication_id];

    for (const fieldName in fieldsToUpdate) {
      fieldNames.push(fieldName);
      values.push(fieldsToUpdate[fieldName]);
    }

    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const query = {
      text: `
        INSERT INTO users (${fieldNames.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `,
      values,
    };

    const result = await db.query(query);
    const newUserProfile = result.rows[0];
    return newUserProfile;
  } catch (err) {
    console.error('Error creating user profile:', err);
    throw new Error('Internal Server Error');
  }
};


const getUserProfileByAuthenticationId = async (authenticationId) => {
  try {
    const query = {
      // select everything fromt the user object except the update_at
      text: 'SELECT id, first_name, last_name, profile_picture, email, bio, education, experience, industry, linkedin, twitter, github, facebook, website, authentication_id, resumeai, created_at FROM users WHERE authentication_id = $1',
      values: [authenticationId],
    };
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching user profile from database:', error);
  }
};

// update user profile

const updateUserProfile = async (userData) => {
  try {
    const { authentication_id, profile_picture, ...fieldsToUpdate } = userData;

    // Arrays to store field names and their corresponding values dynamically.
    const fieldNames = [];
    const values = [];

    for (const fieldName in fieldsToUpdate) {
      // Check to ensure you don't include profile_picture, even if it's present in userData
      if (fieldName !== 'profile_picture') {
        fieldNames.push(fieldName);
        values.push(fieldsToUpdate[fieldName]);
      }
    }

    values.push(authentication_id);

    const updateColumns = fieldNames.map((fieldName, index) => `${fieldName} = $${index + 1}`).join(', ');

    const query = {
      text: `
        UPDATE users
        SET ${updateColumns}
        WHERE authentication_id = $${values.length}
        RETURNING *
      `,
      values,
    };

    const { rows } = await db.query(query);
    return rows[0];

  } catch (err) {
    console.error('Error updating user profile:', err);
    throw new Error('Internal Server Error');
  }
};



module.exports = {
  getUsers,
  createUserProfile,
  getUserProfileByAuthenticationId,
  updateUserProfile,
 };







