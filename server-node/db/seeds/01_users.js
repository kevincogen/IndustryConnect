const faker = require('faker');
const { Pool } = require('pg');

// -- Configure the database connection
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'industry_connect',
  password: 'labber',
  port: 5432,
});

// -- Function to generate random user data
const generateRandomUser = () => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    authentication_id: faker.datatype.uuid(),
    profile_picture: faker.image.avatar(),
    bio: faker.lorem.paragraph(),
    education: faker.lorem.sentence(),
    experience: faker.name.jobTitle(),
    linkedin: faker.internet.url(),
    twitter: faker.internet.url(),
    github: faker.internet.url(),
    facebook: faker.internet.url(),
    website: faker.internet.url(),
  };
};

// -- Function to seed users table
const seedUsersTable = async () => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM users');
    const numOfUsers = 50;
    for (let i = 0; i < numOfUsers; i++) {
      const userData = generateRandomUser();
      const query = {
        text: `
          INSERT INTO users
            (
              first_name,
              last_name,
              email,
              authentication_id,
              profile_picture,
              bio,
              education,
              experience,
              linkedin,
              twitter,
              github,
              facebook,
              website
            )
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `,
        values: Object.values(userData),
      };
      await client.query(query);
    }
    console.log('Users table seeded successfully.');
  } catch (err) {
    console.error('Error seeding users table:', err);
  } finally {
    client.release();
    pool.end();
  }
};

seedUsersTable();

