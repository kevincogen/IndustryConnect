const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');

// -- Configure the database connection
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'industry_connect',
  password: 'labber',
  port: 5432,
});

// -- List of industry categories
const industryCategories = [
  "Information Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
  "Engineering",
  "Human Resources",
  "Design",
  "Business Development",
  "Customer Service",
  "Project Management",
  "Consulting",
  "Media and Communication",
  "Legal Services",
  "Accounting",
  "Administration",
  "Research and Development",
  "Manufacturing",
  "Retail",
  "Hospitality and Tourism",
  "Real Estate",
  "Nonprofit and Social Services",
  "Government and Public Administration",
  "Art and Entertainment",
  "Science and Technology",
  "Environmental and Sustainability",
  "Transportation and Logistics",
  "Architecture and Construction",
  "Sports and Fitness"
];

// -- Function to generate random user data
const generateRandomUser = (industry) => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    authentication_id: faker.string.uuid(),
    profile_picture: faker.image.avatar(),
    industry: industryCategories[Math.floor(Math.random() * industryCategories.length)],
    bio: faker.lorem.paragraph(),
    education: faker.lorem.sentence(),
    experience: faker.person.jobTitle(),
    industry, // set the industry
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
              industry,
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
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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

module.exports = seedUsersTable;

