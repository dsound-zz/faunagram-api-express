# Troubleshooting Database Creation

## If tables weren't created, try these steps:

### Option 1: Use the Simple Schema (Recommended)

1. Go to Supabase Dashboard → SQL Editor
2. Copy the entire contents of `schema-simple.sql`
3. Paste and run it
4. Check Table Editor to verify tables exist

### Option 2: Create Tables One at a Time

1. Go to Supabase Dashboard → SQL Editor
2. Copy and run each CREATE TABLE statement from `create-tables-step-by-step.sql` separately
3. Start with `users`, then `animals`, then `sightings`, then `comments`
4. After all tables are created, run the CREATE INDEX statements

### Option 3: Use Supabase Table Editor (GUI)

1. Go to **Table Editor** in Supabase
2. Click **New Table**
3. Create each table manually:

**Users Table:**
- id: int8 (Primary Key, Auto-increment)
- name: text
- username: text (Unique, Not Null)
- password_digest: text (Not Null)
- avatar_path: text
- created_at: timestamp (Default: now())
- updated_at: timestamp (Default: now())

**Animals Table:**
- id: int8 (Primary Key, Auto-increment)
- name: text
- kingdom: text
- phylum: text
- order: text (Note: "order" is a reserved word, use quotes)
- family: text
- genus: text
- species: text
- cls: text
- gname: text
- description: text
- taxon_id: int4
- image: text
- created_at: timestamp (Default: now())
- updated_at: timestamp (Default: now())

**Sightings Table:**
- id: int8 (Primary Key, Auto-increment)
- title: text
- body: text
- user_id: int8 (Foreign Key → users.id)
- animal_id: int8 (Foreign Key → animals.id)
- image_path: text
- likes: int4 (Default: 0)
- created_at: timestamp (Default: now())
- updated_at: timestamp (Default: now())

**Comments Table:**
- id: int8 (Primary Key, Auto-increment)
- body: text (Not Null)
- commentable_type: text (Not Null)
- commentable_id: int4 (Not Null)
- user_id: int8 (Foreign Key → users.id)
- username: text
- created_at: timestamp (Default: now())
- updated_at: timestamp (Default: now())

### Check What Went Wrong

Run this query in SQL Editor to see if tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
```

If you see errors, check:
1. Are you in the correct Supabase project?
2. Do you have the right permissions?
3. Are there any error messages in the SQL Editor?

### Common Issues

**Issue: "relation already exists"**
- Tables might already exist. Check Table Editor first.
- If they exist but seed fails, the structure might be wrong.

**Issue: "permission denied"**
- Make sure you're using the SQL Editor (not a restricted view)
- Check that you're the project owner/admin

**Issue: "syntax error"**
- Make sure you're copying the entire SQL statement
- Check for any special characters that got corrupted

### Verify Tables Are Created

After running the SQL, verify with:
```sql
SELECT * FROM users LIMIT 1;
SELECT * FROM animals LIMIT 1;
SELECT * FROM sightings LIMIT 1;
SELECT * FROM comments LIMIT 1;
```

If these queries work, your tables are created correctly!

