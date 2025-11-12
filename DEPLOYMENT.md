# Faunagram API - Deployment Guide

## Quick Start

### 1. Set Up Supabase Database

Run the SQL schema in `database/schema.sql` in your Supabase SQL editor:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the query

### 2. Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `faunagram`
3. Make it **public** (for image access)
4. Set up the following folders:
   - `avatars/` - for user avatars
   - `sightings/` - for sighting images

### 3. Get Supabase Credentials

From your Supabase project settings:
- **Project URL** → `SUPABASE_URL`
- **Service Role Key** → `SUPABASE_SERVICE_KEY` (keep this secret!)
- **Anon Key** → `SUPABASE_ANON_KEY`

### 4. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd faunagram-api-express
vercel

# Set environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_KEY
vercel env add SUPABASE_BUCKET
vercel env add JWT_SECRET
vercel env add FRONTEND_URL
```

#### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `SUPABASE_BUCKET` (default: `faunagram`)
   - `JWT_SECRET` (generate a random secret)
   - `FRONTEND_URL` (your frontend URL for CORS)

### 5. Update Frontend

Update your frontend API URL to point to your Vercel deployment:

```javascript
// Example: In your React app
const API_URL = 'https://your-api.vercel.app/api/v1';
```

## Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Service role key (has admin access) | `eyJhbGc...` |
| `SUPABASE_BUCKET` | Storage bucket name | `faunagram` |
| `JWT_SECRET` | Secret for JWT tokens | `your-random-secret-here` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

## Testing the API

After deployment, test the health endpoint:

```bash
curl https://your-api.vercel.app/api/health
```

Should return: `{"status":"ok"}`

## Troubleshooting

### Images not loading
- Make sure the storage bucket is set to **public**
- Check that `SUPABASE_BUCKET` environment variable matches your bucket name
- Verify file paths are correct (`avatars/` and `sightings/`)

### CORS errors
- Add your frontend URL to `FRONTEND_URL` environment variable
- Check that CORS is configured correctly in `api/index.js`

### Database connection errors
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are correct
- Check that the database schema has been created
- Ensure tables exist in your Supabase database

### Authentication errors
- Verify `JWT_SECRET` is set
- Check that passwords are being hashed correctly
- Ensure user exists in database

## Local Development

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials
3. Run `npm install`
4. Run `npm run dev`
5. API will be available at `http://localhost:3000`

## API Base URL

After deployment, your API will be available at:
```
https://your-project-name.vercel.app/api/v1
```

Update your frontend to use this URL!

