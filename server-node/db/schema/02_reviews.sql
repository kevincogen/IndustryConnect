-- DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  reviewer_id INT NOT NULL,
  FOREIGN KEY (reviewer_id) REFERENCES users (id),
  reviewee_id INT NOT NULL,
  FOREIGN KEY (reviewee_id) REFERENCES users (id),
  rating INT NOT NULL,
  review TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
