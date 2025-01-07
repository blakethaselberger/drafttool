const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

// Set the environment (default to 'development' if not specified)
const ENV = process.env.NODE_ENV || 'development';
const isMockMode = ENV === 'development' && process.env.MOCK_MODE === 'true';

console.log(`Running in ${ENV} mode`);
if (isMockMode) {
    console.log('Mock mode is enabled');
}

// Import routes
const playerRoutes = isMockMode
    ? require('./tests/mocks/routes/playerRoutesMock')
    : require('./routes/playerRoutes');

const teamRoutes = isMockMode
    ? require('./tests/mocks/routes/teamRoutesMock')
    : require('./routes/teamRoutes');

const seasonStatisticRoutes = isMockMode
    ? require('./tests/mocks/routes/seasonStatisticRoutesMock')
    : require('./routes/seasonStatisticRoutes');

const draftSessionRoutes = isMockMode
    ? require('./tests/mocks/routes/draftSessionRoutesMock')
    : require('./routes/draftSessionRoutes');

const draftPickRoutes = isMockMode
    ? require('./tests/mocks/routes/draftPickRoutesMock')
    : require('./routes/draftPickRoutes');

const draftSessionPlayerRoutes = isMockMode
    ? require('./tests/mocks/routes/draftSessionPlayerRoutesMock')
    : require('./routes/draftSessionPlayerRoutes');

// Initialize Express app
const app = express();

// Set port based on mode (3000 for mock mode, 80 for real mode)
const PORT = isMockMode ? 3000 : 80;

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

// Start the server
if (isMockMode) {
    console.log('Starting mock server...');
    app.listen(PORT, () => {
        console.log(`Mock server is running on port ${PORT}`);
    });
} else {
    console.log('Starting production server...');
    sequelize.authenticate()
        .then(() => {
            console.log('Database connected successfully.');
            return sequelize.sync();
        })
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error);
        });
}

module.exports = app;