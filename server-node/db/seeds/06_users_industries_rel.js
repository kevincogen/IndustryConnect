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

// -- Function to generate random user_industries_rel data
const generateRandomUserIndustryRelation = (userIds, industryIds, userIndustriesMap) => {
  const user_id = faker.helpers.arrayElement(userIds);
  const userIndustries = userIndustriesMap.get(user_id) || [];

  // User already has 3 industries, skip and try again
  if (userIndustries.length >= 3) {
    return null;
  }

  const industry_id = faker.helpers.arrayElement(industryIds);

  // Check if the user already has this industry, if yes, skip and try again
  if (userIndustries.includes(industry_id)) {
    return generateRandomUserIndustryRelation(userIds, industryIds, userIndustriesMap);
  }

  // Update the userIndustriesMap with the new industry for the user
  userIndustries.push(industry_id);
  userIndustriesMap.set(user_id, userIndustries);

  return { user_id, industry_id };
};

// -- Function to seed user_industries_rel table
const seedUserIndustriesRelTable = async () => {
  const client = await pool.connect();
  try {
    const usersQuery = await client.query('SELECT id FROM users');
    const userIds = usersQuery.rows.map((row) => row.id);

    const industriesQuery = await client.query('SELECT id FROM industries');
    const industryIds = industriesQuery.rows.map((row) => row.id);

    const userIndustriesMap = new Map();

    const numOfRelations = 100;
    for (let i = 0; i < numOfRelations; i++) {
      const relationData = generateRandomUserIndustryRelation(userIds, industryIds, userIndustriesMap);

      if (relationData) {
        const query = {
          text: `
            INSERT INTO users_industries_rel
              (user_id, industry_id)
            VALUES
              ($1, $2)
          `,
          values: [relationData.user_id, relationData.industry_id],
        };
        await client.query(query);
      }
    }

    console.log('users_industries_rel table seeded successfully.');
  } catch (err) {
    console.error('Error seeding user_industries_rel table:', err);
  } finally {
    client.release();
    pool.end();
  }
};

seedUserIndustriesRelTable();
