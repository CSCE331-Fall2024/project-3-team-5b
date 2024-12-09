require('dotenv').config();  // Load environment variables from .env file
const express = require('express');  // Import Express
const cors = require('cors');  // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
const allowedOrigins = [
    'https://project-3-team-5b.onrender.com',
    'http://localhost:5173'
];

const itemComponentsRoutes = require('./my-api/itemComponents');
const inventoryRoutes = require('./my-api/inventory');
const reviewsRoutes = require('./my-api/reviews');  // Import the reviews routes


app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());  // Parse JSON payloads

// Import database connection
const pool = require('./config/db');

// Employees
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cashier');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, hours_worked, password, manager_id } = req.body;

        const result = await pool.query(
            'UPDATE cashier SET name = $1, hours_worked = $2, password = $3, manager_id = $4 WHERE id = $5 RETURNING *',
            [name, hours_worked, password, manager_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error in PUT /api/employees/:id:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/employees', async (req, res) => {
    try {
        const { name, hours_worked, password, manager_id } = req.body;

        const result = await pool.query(
            'INSERT INTO cashier (name, hours_worked, password, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, hours_worked, password, manager_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send('Server error');
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM cashier WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully', deletedEmployee: result.rows[0] });
    } catch (error) {
        console.error('Error in DELETE /api/employees/:id:', error);
        res.status(500).send('Server error');
    }
});

// Menu Items
app.get('/api/menu-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu_item ORDER BY id;');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.put('/api/menu-items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, base_price, description, image, maxentrees, maxsides, hasdrink } = req.body;

        const result = await pool.query(
            `UPDATE menu_item 
             SET name = $1, base_price = $2, description = $3, image = $4, maxentrees = $5, maxsides = $6, hasdrink = $7 
             WHERE id = $8 RETURNING *`,
            [name, base_price, description, image, maxentrees, maxsides, hasdrink, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error in PUT /api/menu-items/:id:', error);
        res.status(500).send('Server error');
    }
});

app.delete('/api/menu-items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM menu_item WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully', deletedItem: result.rows[0] });
    } catch (error) {
        console.error('Error in DELETE /api/menu-items/:id:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/menu-items', async (req, res) => {
    try {
        const { name, base_price, description, image, maxentrees, maxsides, hasdrink } = req.body;

        const result = await pool.query(
            `INSERT INTO menu_item (name, base_price, description, image, maxentrees, maxsides, hasdrink) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [name, base_price, description, image, maxentrees, maxsides, hasdrink]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error in POST /api/menu-items:', error);
        res.status(500).send('Server error');
    }
});



// Integrating the Reviews API
app.use('/api/reviews', reviewsRoutes);

app.use('/api/inventory', inventoryRoutes);
app.use('/api/item-components', itemComponentsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
