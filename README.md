# Faunagram API - Express.js

Express.js API for Faunagram, deployed on Vercel with Supabase backend.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your Supabase credentials:
```bash
cp .env.example .env
```

3. Set up environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_BUCKET` - Storage bucket name (default: `faunagram`)
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS (optional)

## Database Schema

The API expects the following tables in Supabase:

- `users` - User accounts
- `animals` - Animal reference data
- `sightings` - User sightings/posts
- `comments` - Comments (polymorphic)

See `database/schema.sql` for the complete schema.

## Local Development

```bash
npm run dev
```

The API will run on `http://localhost:3000` (or the port specified by Vercel).

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
- Go to your project settings
- Add all variables from `.env.example`

## API Endpoints

### Authentication
- `POST /api/v1/login` - Login
- `GET /api/v1/current_user` - Get current user from token

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get single user
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `PUT /api/v1/users/:id/avatar_upload` - Upload avatar
- `DELETE /api/v1/users/:id` - Delete user
- `GET /api/v1/users/:id/comments` - Get user comments

### Animals
- `GET /api/v1/animals` - Get all animals
- `GET /api/v1/animals/:id` - Get single animal
- `PUT /api/v1/animals/:id` - Update animal

### Sightings
- `GET /api/v1/sightings` - Get all sightings
- `GET /api/v1/sightings/:id` - Get single sighting
- `POST /api/v1/sightings` - Create sighting (auth required)
- `PUT /api/v1/sightings/:id` - Update sighting (auth required)
- `PUT /api/v1/sightings/:id/image_upload` - Upload image (auth required)
- `DELETE /api/v1/sightings/:id` - Delete sighting (auth required)
- `GET /api/v1/sightings/:id/comments` - Get sighting comments

### Comments
- `GET /api/v1/comments` - Get all comments (with optional filters)
- `POST /api/v1/comments` - Create comment (auth required)
- `PUT /api/v1/comments/:id` - Update comment (auth required)
- `DELETE /api/v1/comments/:id` - Delete comment (auth required)
- `GET /api/v1/comments/:id/comments` - Get nested comments

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from the `/api/v1/login` endpoint.

