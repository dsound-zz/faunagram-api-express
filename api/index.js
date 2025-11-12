require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const animalsRoutes = require('./routes/animals');
const sightingsRoutes = require('./routes/sightings');
const commentsRoutes = require('./routes/comments');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/animals', animalsRoutes);
app.use('/api/v1/sightings', sightingsRoutes);
app.use('/api/v1/comments', commentsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Export for Vercel
module.exports = app;

