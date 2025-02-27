const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
     logging: false, 
});

sequelize.sync({ alter: true })

sequelize.authenticate()
    .then(() => console.log('Database connection established.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = { sequelize };
