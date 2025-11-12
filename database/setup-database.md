# Setting Up Supabase Database

## Step 1: Create Tables in Supabase

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `schema.sql` into the editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

This will create all the necessary tables:
- `users`
- `animals`
- `sightings`
- `comments`

## Step 2: Verify Tables Were Created

1. Go to **Table Editor** in the left sidebar
2. You should see all 4 tables listed

## Step 3: Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name it: `faunagram`
4. Make it **Public** (toggle the switch)
5. Click **Create bucket**

## Step 4: Set Up Storage Folders (Optional but Recommended)

After creating the bucket, you can create folders:
- `avatars/` - for user profile pictures
- `sightings/` - for sighting images

To create folders, you can upload a dummy file with the path `avatars/.keep` and `sightings/.keep`, or they'll be created automatically when you upload files.

## Step 5: Run Seed Script

Once the tables are created, run:
```bash
npm run seed
```

## Troubleshooting

If you get "table not found" errors:
- Make sure you ran the schema.sql in the SQL Editor
- Check that you're connected to the correct Supabase project
- Verify the table names match exactly (case-sensitive)

If you get permission errors:
- Make sure you're using the **Service Role Key** (not the anon key) in your `.env` file
- The service role key has admin access to create tables and insert data

