const db = require('../../db/connection');
const { Pool } = require('pg');


// Function to get chat history for a specific user from the database
async function getChatHistoryFromDatabase(matchId) {
  const query = 'SELECT * FROM messages WHERE match_id = $1';
  const values = [matchId];

  const client = await db.connect();
  try {
    const result = await client.query(query, values);
    console.log("result.rows: ", result.rows);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
  }

// Function to post message to the database
async function postMessageToDB({ matchId, sender_id, receiver_id, message}) {
  const query = `
    INSERT INTO messages (match_id, sender_id, receiver_id, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [matchId, sender_id, receiver_id, message];

  const client = await db.connect();
  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}


module.exports = {
  getChatHistoryFromDatabase,
  postMessageToDB,
}
