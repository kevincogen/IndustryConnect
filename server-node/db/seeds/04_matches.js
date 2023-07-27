const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');

// -- Configure the database connection
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'industry_connect',
  password: 'labber',
  port: 5432,
});

// -- Function to generate random matches data
const generateRandomMatch = (numOfUsers) => {
  const user_id_1 = faker.number.int({ min: 1, max: numOfUsers });
  let user_id_2 = faker.number.int({ min: 1, max: numOfUsers });

  // Ensure user_id_2 is different from user_id_1
  while (user_id_2 === user_id_1) {
    user_id_2 = faker.number.int({ min: 1, max: numOfUsers });
  }

  return {
    user_id_1,
    user_id_2,
  };
};

// -- Function to seed matches table
const seedMatchesTable = async () => {
  const client = await pool.connect();
  try {
    const usersCountQuery = await client.query('SELECT COUNT(*) AS count FROM users');
    const numOfUsers = usersCountQuery.rows[0].count;

    const numOfMatches = 50; // Change this number to seed more or less matches
    for (let i = 0; i < numOfMatches; i++) {
      const matchData = generateRandomMatch(numOfUsers);
      const query = {
        text: `
          INSERT INTO matches
            (user_id_1, user_id_2)
          VALUES
            ($1, $2)
        `,
        values: [matchData.user_id_1, matchData.user_id_2],
      };
      await client.query(query);
    }
    console.log('Matches table seeded successfully.');
  } catch (err) {
    console.error('Error seeding matches table:', err);
  } finally {
    client.release();
    pool.end();
  }
};

seedMatchesTable();
