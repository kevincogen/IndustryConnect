DROP TABLE IF EXISTS matches CASCADE;

CREATE TABLE matches (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id_1 INT NOT NULL,
  FOREIGN KEY (user_id_1) REFERENCES users (id),
  user_id_2 INT NOT NULL,
  FOREIGN KEY (user_id_2) REFERENCES users (id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id_1, user_id_2)
);
