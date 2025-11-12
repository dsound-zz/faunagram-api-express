-- Faunagram Database Schema for Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest VARCHAR(255) NOT NULL,
  avatar_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add avatar_path column if it doesn't exist (for existing databases)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='users' AND column_name='avatar_path') THEN
    ALTER TABLE users ADD COLUMN avatar_path VARCHAR(255);
  END IF;
END $$;

-- Animals table
CREATE TABLE IF NOT EXISTS animals (
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

-- Sightings table
CREATE TABLE IF NOT EXISTS sightings (
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

-- Add image_path column if it doesn't exist (for existing databases)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='sightings' AND column_name='image_path') THEN
    ALTER TABLE sightings ADD COLUMN image_path VARCHAR(255);
  END IF;
END $$;

-- Comments table (polymorphic)
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  commentable_type VARCHAR(255) NOT NULL,
  commentable_id INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sightings_user_id ON sightings(user_id);
CREATE INDEX IF NOT EXISTS idx_sightings_animal_id ON sightings(animal_id);
CREATE INDEX IF NOT EXISTS idx_comments_commentable ON comments(commentable_type, commentable_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Storage buckets (run in Supabase SQL editor)
-- Note: These need to be created in Supabase Storage UI or via Supabase client
-- The bucket 'faunagram' should be created with public access for images

