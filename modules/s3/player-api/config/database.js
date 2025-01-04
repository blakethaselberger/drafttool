const Sequelize = require('sequelize');

// Use environment variables for database credentials
const dbHost = process.env.RDS_ENDPOINT;
const dbName = process.env.RDS_DB_NAME;
const dbUser = process.env.RDS_USERNAME;
const dbPassword = process.env.RDS_PASSWORD;

// Initialize Sequelize with the environment variables
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
