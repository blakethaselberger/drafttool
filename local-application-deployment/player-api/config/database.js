const { Sequelize } = require('sequelize');

// Check if mock mode is enabled
const isMockMode = process.env.MOCK_MODE === 'true';

let sequelize;

if (isMockMode) {
    console.log('Mock mode enabled: Skipping database connection initialization.');
    sequelize = null; // Prevent Sequelize initialization in mock mode
} else {
    // Use environment variables for database credentials
    const dbHost = process.env.RDS_ENDPOINT;
    const dbName = process.env.RDS_DB_NAME;
    const dbUser = process.env.RDS_USERNAME;
    const dbPassword = process.env.RDS_PASSWORD;

    // Initialize Sequelize with the environment variables
    sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: 'mysql',
        logging: false, // Disable logging for cleaner output
    });

    // Authenticate the database connection
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = sequelize;