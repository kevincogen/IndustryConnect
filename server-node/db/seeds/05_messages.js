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

// -- Function to generate random messages data
const generateRandomMessages = (userIds) => {
  const conversation = [];
  const numOfMessages = faker.number.int({ min: 4, max: 10 });

  for (let i = 0; i < numOfMessages; i++) {
    const sender_id = faker.helpers.arrayElement(userIds);
    let receiver_id = faker.helpers.arrayElement(userIds);

    // Ensure receiver_id is different from sender_id
    while (receiver_id === sender_id) {
      receiver_id = faker.helpers.arrayElement(userIds);
    }

    conversation.push({
      sender_id,
      receiver_id,
      message: faker.lorem.sentence(),
    });
  }

  return conversation;
};

// -- Function to seed messages table
const seedMessagesTable = async () => {
  const client = await pool.connect();
  try {
    const matchesQuery = await client.query('SELECT id FROM matches');
    const matchIds = matchesQuery.rows.map((row) => row.id);

    const usersQuery = await client.query('SELECT id FROM users');
    const userIds = usersQuery.rows.map((row) => row.id);

    const numOfConversations = 50; // Change this number to seed more or less conversations
    for (let i = 0; i < numOfConversations; i++) {
      const match_id = faker.helpers.arrayElement(matchIds);
      const conversationData = generateRandomMessages(userIds);

      for (const message of conversationData) {
        const query = {
          text: `
            INSERT INTO messages
              (match_id, sender_id, receiver_id, message)
            VALUES
              ($1, $2, $3, $4)
          `,
          values: [match_id, message.sender_id, message.receiver_id, message.message],
        };
        await client.query(query);
      }
    }

    console.log('Messages table seeded successfully.');
  } catch (err) {
    console.error('Error seeding messages table:', err);
  } finally {
    client.release();
    pool.end();
  }
};

seedMessagesTable();
