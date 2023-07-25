DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  match_id INT NOT NULL,
  FOREIGN KEY (match_id) REFERENCES matches (id),
  sender_id INT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES users (id),
  receiver_id INT NOT NULL,
  FOREIGN KEY (receiver_id) REFERENCES users (id),
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
