const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

// Import routes
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const seasonStatisticRoutes = require('./routes/seasonStatisticRoutes');
const draftSessionRoutes = require('./routes/draftSessionRoutes');
const draftPickRoutes = require('./routes/draftPickRoutes');
const draftSessionPlayerRoutes = require('./routes/draftSessionPlayerRoutes');

// Initialize Express app
const app = express();

// Set port
const PORT = 80;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/season-statistics', seasonStatisticRoutes);
app.use('/api/draft-sessions', draftSessionRoutes);
app.use('/api/draft-picks', draftPickRoutes);
app.use('/api/draft-session-players', draftSessionPlayerRoutes);

// Sync database and start server
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to sync database:', error);
    });

module.exports = app;