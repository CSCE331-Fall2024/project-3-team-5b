// my-api/reviews.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all reviews for a specific item_component (mic)
router.get('/:mic', async (req, res) => {
    try {
        const { mic } = req.params;
        const result = await pool.query('SELECT * FROM reviews WHERE mic = $1', [mic]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get the average rating for a specific item_component (mic)
// Server-side code (Express route)
router.get('/api/reviews/:mic/average', async (req, res) => {
    try {
        const { mic } = req.params;

        console.log(`Received request for MIC: ${mic}`);

        const result = await pool.query('SELECT AVG(rating) AS average_rating FROM reviews WHERE mic = $1', [mic]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this MIC' });
        }

        const averageRating = parseFloat(result.rows[0].average_rating).toFixed(2);

        console.log(`Calculated average rating: ${averageRating}`);

        res.status(200).json({ mic, averageRating });
    } catch (error) {
        console.error('Database or server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Add a new review for an item_component
router.post('/', async (req, res) => {
    try {
        const { mic, rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const result = await pool.query(
            'INSERT INTO reviews (mic, rating) VALUES ($1, $2) RETURNING *',
            [mic, rating]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
