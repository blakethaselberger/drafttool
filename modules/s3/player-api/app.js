const express = require('express');
const sequelize = require('./config/database');
const playerRoutes = require('./routes/playerRoutes');
const seasonRoutes = require('./routes/seasonsRoutes'); // Add additional routes here

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/seasons', seasonRoutes); // Add your seasons routes here

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

// Sync database and start server
sequelize.sync()
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });