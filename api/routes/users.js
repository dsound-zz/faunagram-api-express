const express = require('express');
const router = express.Router();
const supabase = require('../../config/database');
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('../../middleware/auth');
const { encodeToken } = require('../../utils/jwt');
const multer = require('multer');

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Get all users
router.get('/', async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, username, name, created_at, avatar_path');

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    // Add avatar URLs
    const usersWithAvatars = await Promise.all(
      users.map(async (user) => {
        if (user.avatar_path) {
          const { data: avatarData } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET || 'faunagram')
            .getPublicUrl(`avatars/${user.avatar_path}`);
          return { ...user, avatar_url: avatarData?.publicUrl };
        }
        return user;
      })
    );

    res.json(usersWithAvatars);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, name, created_at, avatar_path')
      .eq('id', req.params.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ errors: 'User not found' });
    }

    // Add avatar URL if exists
    let avatarUrl = null;
    if (user.avatar_path) {
      const { data: avatarData } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'faunagram')
        .getPublicUrl(`avatars/${user.avatar_path}`);
      avatarUrl = avatarData?.publicUrl;
    }

    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: avatarUrl,
      created_at: user.created_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Create user (register)
router.post('/', async (req, res) => {
  try {
    const { username, password, name } = req.body;

    if (!username || !password) {
      return res.status(400).json({ errors: 'Username and password required' });
    }

    if (password.length < 5) {
      return res.status(400).json({ errors: 'Password must be at least 5 characters' });
    }

    // Check if username exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return res.status(400).json({ errors: 'Username already taken' });
    }

    // Hash password
    const passwordDigest = await bcrypt.hash(password, 10);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        username,
        password_digest: passwordDigest,
        name: name || username
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    // Generate token for new user
    const token = encodeToken(user.id);

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

    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (parseInt(req.params.id) !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to update this user' });
    }

    const { name } = req.body;
    const updateData = {};

    if (name) updateData.name = name;

    const { data: user, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: avatarUrl,
      created_at: user.created_at
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Upload avatar
router.put('/:id/avatar_upload', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (parseInt(req.params.id) !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to update this user' });
    }

    if (!req.file) {
      return res.status(400).json({ errors: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${req.userId}_${Date.now()}_${file.originalname}`;
    const filePath = `avatars/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET || 'faunagram')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (uploadError) {
      return res.status(500).json({ errors: uploadError.message });
    }

    // Update user with avatar path
    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({ avatar_path: fileName })
      .eq('id', req.params.id)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({ errors: updateError.message });
    }

    // Get public URL
    const { data: urlData } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET || 'faunagram')
      .getPublicUrl(filePath);

    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: urlData?.publicUrl,
      created_at: user.created_at
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (parseInt(req.params.id) !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to delete this user' });
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Get user comments
router.get('/:id/comments', async (req, res) => {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('commentable_type', 'User')
      .eq('commentable_id', req.params.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(comments);
  } catch (error) {
    console.error('Get user comments error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

module.exports = router;

