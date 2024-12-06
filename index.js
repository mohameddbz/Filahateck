const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./src/config/config.js");
const dotenv = require("dotenv");
const userAuth = require('./src/auth/authRoutes.js');
const userRoutes = require('./src/routes/user/userRoutes.js');
const roleRoutes = require('./src/routes/role/roleRoutes.js');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Default port if not specified in .env

// Middleware
app.use(cors({ origin: true, credentials: true })); // Allows cross-origin requests with credentials
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Supports form data

// Logging Middleware
app.use((req, res, next) => {
    console.log("Request Details:");
    console.log(`- Method: ${req.method}`);
    console.log(`- Path: ${req.path}`);
    console.log(`- Headers: ${JSON.stringify(req.headers, null, 2)}`);
    if (req.body && Object.keys(req.body).length) {
        console.log(`- Body: ${JSON.stringify(req.body, null, 2)}`);
    } else {
        console.log("- Body: [No body data]");
    }
    next();
});

// Routes
app.use('/api/auth', userAuth); // user-related routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);



// Synchronize the database and start the server
sequelize
    .authenticate()
    .then(() => {
        return sequelize.sync(); // Sync models with the database
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error initializing the database or server:", error);
    });
