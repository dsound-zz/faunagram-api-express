const express = require('express');
const router = express.Router();
const supabase = require('../../config/database');
const { encodeToken } = require('../../utils/jwt');
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('../../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ errors: 'Username and password required' });
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ errors: 'Your username/password is incorrect' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_digest);
    if (!isValidPassword) {
      return res.status(401).json({ errors: 'Your username/password is incorrect' });
    }

    // Generate token
    const token = encodeToken(user.id);

    // Get user with avatar URL if exists
    let avatarUrl = null;
    if (user.avatar_path) {
      const { data: avatarData } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'faunagram')
        .getPublicUrl(`avatars/${user.avatar_path}`);
      avatarUrl = avatarData?.publicUrl;
    }

    const userResponse = {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: avatarUrl,
      created_at: user.created_at
    };

    res.json({ user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Get current user from token
router.get('/current_user', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ errors: 'User not found' });
    }

    // Get avatar URL if exists
    let avatarUrl = null;
    if (user.avatar_path) {
      const { data: avatarData } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'faunagram')
        .getPublicUrl(`avatars/${user.avatar_path}`);
      avatarUrl = avatarData?.publicUrl;
    }

    const userResponse = {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: avatarUrl,
      created_at: user.created_at
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

module.exports = router;

