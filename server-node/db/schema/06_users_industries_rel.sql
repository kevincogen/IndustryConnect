CREATE TABLE user_industries_rel (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  industry_id INT NOT NULL,
  FOREIGN KEY (industry_id) REFERENCES industries (id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
