-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  authentication_id VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  bio TEXT,
  education TEXT,
  experience TEXT,
  linkedin VARCHAR(255),
  twitter VARCHAR(255),
  github VARCHAR(255),
  facebook VARCHAR(255),
  website VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
