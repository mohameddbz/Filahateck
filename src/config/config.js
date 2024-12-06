const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: console.log, // Logs SQL queries; set to false to disable
});

sequelize.authenticate()
    .then(() => console.log('Database connection established.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = { sequelize };
