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

// -- Function to generate random review data
const generateRandomReview = () => {
  return {
    reviewer_id: faker.number.int({ min: 1, max: 50 }),
    reviewee_id: faker.number.int({ min: 1, max: 50 }),
    rating: faker.number.int({ min: 1, max: 5 }),
    review: faker.lorem.paragraph(),
  };
};

// -- Function to seed reviews table
const seedReviewsTable = async () => {
  const client = await pool.connect();
  try {
    const numOfReviews = 100; // Change this number to seed more or less reviews
    for (let i = 0; i < numOfReviews; i++) {
      const reviewData = generateRandomReview();
      const query = {
        text: `
          INSERT INTO reviews
            (reviewer_id, reviewee_id, rating, review)
          VALUES
            ($1, $2, $3, $4)
        `,
        values: Object.values(reviewData),
      };
      await client.query(query);
    }
    console.log('Reviews table seeded successfully.');
  } catch (err) {
    console.error('Error seeding reviews table:', err);
  } finally {
    client.release();
    pool.end();
  }
};

seedReviewsTable();
