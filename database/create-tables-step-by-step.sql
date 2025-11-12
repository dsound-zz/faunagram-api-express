-- STEP-BY-STEP: Run each section separately if the full script doesn't work

-- Step 1: Create Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest VARCHAR(255) NOT NULL,
  avatar_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create Animals table
CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  kingdom VARCHAR(255),
  phylum VARCHAR(255),
  "order" VARCHAR(255),
  family VARCHAR(255),
  genus VARCHAR(255),
  species VARCHAR(255),
  cls VARCHAR(255),
  gname VARCHAR(255),
  description TEXT,
  taxon_id INTEGER,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create Sightings table
CREATE TABLE sightings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
  image_path VARCHAR(255),
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create Comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  commentable_type VARCHAR(255) NOT NULL,
  commentable_id INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 5: Create indexes (run after tables are created)
CREATE INDEX idx_sightings_user_id ON sightings(user_id);
CREATE INDEX idx_sightings_animal_id ON sightings(animal_id);
CREATE INDEX idx_comments_commentable ON comments(commentable_type, commentable_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_users_username ON users(username);

