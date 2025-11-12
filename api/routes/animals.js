const express = require('express');
const router = express.Router();
const supabase = require('../../config/database');

// Get all animals
router.get('/', async (req, res) => {
  try {
    const { data: animals, error } = await supabase
      .from('animals')
      .select('*')
      .order('name');

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(animals);
  } catch (error) {
    console.error('Get animals error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Get single animal
router.get('/:id', async (req, res) => {
  try {
    const { data: animal, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !animal) {
      return res.status(404).json({ errors: 'Animal not found' });
    }

    res.json(animal);
  } catch (error) {
    console.error('Get animal error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

// Update animal
router.put('/:id', async (req, res) => {
  try {
    const { data: animal, error } = await supabase
      .from('animals')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ errors: error.message });
    }

    res.json(animal);
  } catch (error) {
    console.error('Update animal error:', error);
    res.status(500).json({ errors: 'Internal server error' });
  }
});

module.exports = router;

