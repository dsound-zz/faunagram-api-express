const express = require('express');
const router = express.Router();
const supabase = require('../../config/database');
const { authenticateToken } = require('../../middleware/auth');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const { commentable_type, commentable_id } = req.query;

    let query = supabase.from('comments').select('*');

    if (commentable_type) {
      query = query.eq('commentable_type', commentable_type);
    }
    if (commentable_id) {
      query = query.eq('commentable_id', commentable_id);
    }

    const { data: comments, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Create comment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { body, commentable_type, commentable_id, username } = req.body;

    if (!body || !commentable_type || !commentable_id) {
      return res.status(400).json({ errors: 'Body, commentable_type, and commentable_id are required' });
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        body,
        commentable_type,
        commentable_id: parseInt(commentable_id),
        user_id: req.userId,
        username: username || null
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Update comment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Check ownership
    const { data: existingComment } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (!existingComment) {
      return res.status(404).json({ errors: 'Comment not found' });
    }

    if (existingComment.user_id !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to update this comment' });
    }

    const { body } = req.body;
    const { data: comment, error } = await supabase
      .from('comments')
      .update({ body })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(comment);
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Delete comment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check ownership
    const { data: existingComment } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (!existingComment) {
      return res.status(404).json({ errors: 'Comment not found' });
    }

    if (existingComment.user_id !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to delete this comment' });
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Get nested comments (replies)
router.get('/:id/comments', async (req, res) => {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('commentable_type', 'Comment')
      .eq('commentable_id', req.params.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(comments);
  } catch (error) {
    console.error('Get nested comments error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

module.exports = router;

