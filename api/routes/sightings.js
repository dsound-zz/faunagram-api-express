const express = require('express');
const router = express.Router();
const supabase = require('../../config/database');
const { authenticateToken } = require('../../middleware/auth');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

// Get all sightings
router.get('/', async (req, res) => {
  try {
    const { data: sightings, error } = await supabase
      .from('sightings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    // Add image URLs, user info, animal info, and comments count
    const sightingsWithDetails = await Promise.all(
      sightings.map(async (sighting) => {
        let imageUrl = null;
        if (sighting.image_path) {
          const { data: imageData } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET || 'faunagram')
            .getPublicUrl(`sightings/${sighting.image_path}`);
          imageUrl = imageData?.publicUrl;
        }

        // Get user info
        const { data: user } = await supabase
          .from('users')
          .select('id, username, name')
          .eq('id', sighting.user_id)
          .single();

        // Get animal info
        const { data: animal } = await supabase
          .from('animals')
          .select('id, name, species')
          .eq('id', sighting.animal_id)
          .single();

        // Get comments count
        const { count } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('commentable_type', 'Sighting')
          .eq('commentable_id', sighting.id);

        return {
          ...sighting,
          image_url: imageUrl,
          user: user || null,
          animal: animal || null,
          comments_count: count || 0
        };
      })
    );

    res.json(sightingsWithDetails);
  } catch (error) {
    console.error('Get sightings error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Get single sighting
router.get('/:id', async (req, res) => {
  try {
    const { data: sighting, error } = await supabase
      .from('sightings')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !sighting) {
      return res.status(404).json({ errors: 'Sighting not found' });
    }

    // Add image URL if exists
    let imageUrl = null;
    if (sighting.image_path) {
      const { data: imageData } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET || 'faunagram')
        .getPublicUrl(`sightings/${sighting.image_path}`);
      imageUrl = imageData?.publicUrl;
    }

    // Get user info
    const { data: user } = await supabase
      .from('users')
      .select('id, username, name')
      .eq('id', sighting.user_id)
      .single();

    // Get animal info
    const { data: animal } = await supabase
      .from('animals')
      .select('id, name, species')
      .eq('id', sighting.animal_id)
      .single();

    res.json({
      ...sighting,
      image_url: imageUrl,
      user: user || null,
      animal: animal || null
    });
  } catch (error) {
    console.error('Get sighting error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Create sighting
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, body, animal_id, likes } = req.body;

    if (!title || !animal_id) {
      return res.status(400).json({ errors: 'Title and animal_id are required' });
    }

    const { data: sighting, error } = await supabase
      .from('sightings')
      .insert({
        title,
        body: body || '',
        user_id: req.userId,
        animal_id: parseInt(animal_id),
        likes: likes || 0
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.status(201).json(sighting);
  } catch (error) {
    console.error('Create sighting error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Update sighting
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Check ownership
    const { data: existingSighting } = await supabase
      .from('sightings')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (!existingSighting) {
      return res.status(404).json({ errors: 'Sighting not found' });
    }

    if (existingSighting.user_id !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to update this sighting' });
    }

    const { title, body, likes } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (body !== undefined) updateData.body = body;
    if (likes !== undefined) updateData.likes = likes;

    const { data: sighting, error } = await supabase
      .from('sightings')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(sighting);
  } catch (error) {
    console.error('Update sighting error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Upload sighting image
router.put('/:id/image_upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    // Check ownership
    const { data: existingSighting } = await supabase
      .from('sightings')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (!existingSighting) {
      return res.status(404).json({ errors: 'Sighting not found' });
    }

    if (existingSighting.user_id !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to update this sighting' });
    }

    if (!req.file) {
      return res.status(400).json({ errors: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${req.params.id}_${Date.now()}_${file.originalname}`;
    const filePath = `sightings/${fileName}`;

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

    // Update sighting with image path
    const { data: sighting, error: updateError } = await supabase
      .from('sightings')
      .update({ image_path: fileName })
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
      ...sighting,
      image_url: urlData?.publicUrl
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Delete sighting
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check ownership
    const { data: existingSighting } = await supabase
      .from('sightings')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (!existingSighting) {
      return res.status(404).json({ errors: 'Sighting not found' });
    }

    if (existingSighting.user_id !== req.userId) {
      return res.status(403).json({ errors: 'You are not authorized to delete this sighting' });
    }

    const { error } = await supabase
      .from('sightings')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json({ message: 'Sighting deleted' });
  } catch (error) {
    console.error('Delete sighting error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Get sighting comments
router.get('/:id/comments', async (req, res) => {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('commentable_type', 'Sighting')
      .eq('commentable_id', req.params.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(comments);
  } catch (error) {
    console.error('Get sighting comments error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

module.exports = router;

