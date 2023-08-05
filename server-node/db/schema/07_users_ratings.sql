DROP TABLE IF EXISTS user_ratings CASCADE;

CREATE TABLE user_ratings (
  id SERIAL PRIMARY KEY,
  rated_user_id INTEGER NOT NULL REFERENCES users(id),
  rater_id INTEGER NOT NULL REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP DEFAULT current_timestamp
);
