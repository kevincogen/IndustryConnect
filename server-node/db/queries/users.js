const db = require('../connection');
const { Pool } = require('pg');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// const registerUser = async (userData) => {
//   try {
//     const { first_name, last_name, email, user_id } = userData;
//     const values = [first_name, last_name, email, user_id];

//      const query = {
//       text: `
//         INSERT INTO users
//           (first_name, last_name, email, authentication_id)
//         VALUES
//           ($1, $2, $3, $4)
//         RETURNING *
//       `,
//       values,
//     };

//     const result = await pool.query(query);
//     const newUser = result.rows[0];
//     return newUser;
//   } catch (err) {
//     console.error('Error registering user:', err);
//     throw new Error('Internal Server Error');
//   }
// };

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

module.exports = { getUsers, createUserProfile };







