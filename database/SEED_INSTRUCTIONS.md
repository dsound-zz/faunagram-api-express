# Seeding Animals Data

This script will populate your Supabase database with 26 animals, each with photos from various wildlife sources.

## Prerequisites

1. Make sure your Supabase database schema is set up (run `database/schema.sql`)
2. Set up your `.env` file with Supabase credentials:
   ```bash
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_KEY=your-service-role-key-here
   ```

## Running the Seed Script

### Option 1: Using npm script
```bash
npm run seed
```

### Option 2: Direct node command
```bash
node database/seed-animals.js
```

## What Gets Seeded

The script will insert 26 animals including:
- Birds: Red Tailed Hawk, Great Horned Owl, Bald Eagle, Osprey, Peregrine Falcon, etc.
- Mammals: Coyote, Raccoon, Red Fox, White-tailed Deer, Bats, etc.
- Marine: Humpback Whale, Harp Seal, Grey Seal
- Reptiles/Amphibians: Painted Turtle, Spotted Salamander, Spring Peeper
- And more!

Each animal includes:
- Scientific name (genus, species)
- Common name
- Taxonomic classification (kingdom, phylum, order, family, class)
- High-quality image URL

## Notes

- The script will NOT delete existing animals by default
- If you want to clear existing data first, uncomment the delete section in `seed-animals.js`
- Images are hosted externally (USFWS Digital Library, Wikimedia, etc.)
- All images are publicly accessible

## Troubleshooting

If you get errors:
1. Check that your `.env` file has correct Supabase credentials
2. Verify the `animals` table exists in your database
3. Make sure you have write permissions (using service role key)
4. Check that the table columns match the schema

