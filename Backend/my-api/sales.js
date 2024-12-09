const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Route to fetch sales data grouped by day
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT DATE(date) AS sales_date, SUM(price) AS total_sales
            FROM orders
            GROUP BY sales_date
            ORDER BY sales_date ASC;
        `;
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
