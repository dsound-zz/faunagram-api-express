# Using Supabase CLI to Create Tables

## Step 1: Link to Your Supabase Project

```bash
cd faunagram-api-express
supabase link --project-ref your-project-ref
```

You can find your project ref in:
- Supabase Dashboard → Settings → General → Reference ID

Or use:
```bash
supabase link
```
And follow the prompts to select your project.

## Step 2: Push Migrations

Once linked, push the migrations to create tables:

```bash
supabase db push
```

This will:
- Create all tables (users, animals, sightings, comments)
- Create indexes
- Apply the migration to your remote Supabase database

## Step 3: Verify Tables Were Created

Check in Supabase Dashboard → Table Editor, or run:

```bash
supabase db remote list
```

## Step 4: Seed Animals Data

After tables are created, run:

```bash
npm run seed
```

## Alternative: Generate Migration from Local Changes

If you make changes locally and want to create a migration:

```bash
supabase migration new create_tables
```

Then edit the migration file and push:

```bash
supabase db push
```

## Troubleshooting

**If `supabase link` fails:**
- Make sure you're logged in: `supabase login`
- Check your project ref is correct

**If `supabase db push` fails:**
- Make sure you're linked: `supabase projects list`
- Check migration files are in `supabase/migrations/`

**To reset everything:**
```bash
supabase db reset
```

## Useful Commands

- `supabase status` - Check local Supabase status
- `supabase db diff` - See differences between local and remote
- `supabase db pull` - Pull remote schema changes
- `supabase db push` - Push local migrations to remote

