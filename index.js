const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/config/config.js");
const dotenv = require("dotenv");
const path = require("path"); // Ajout du module path
const userAuth = require('./src/auth/authRoutes.js');
const userRoutes = require('./src/routes/user/userRoutes.js');
const roleRoutes = require('./src/routes/role/roleRoutes.js');
const sellerRoutes = require('./src/routes/role/sellerRoleRoutes.js');
const userSellerRoleRoutes = require('./src/routes/user/userSellerRoleRoutes.js');
const publicationRoutes = require('./src/routes/publication/publicationRoutes.js');
const abonnementRoutes = require('./src/routes/Abonnement/AbonnementRoutes.js');
const sellerAbonnementUserRoutes = require('./src/routes/Abonnement/SellerAbonnementUserRoutes.js');
const sellerAbonnementRoutes = require('./src/routes/Abonnement/SellerAbonnementRoutes.js');
const SellerAbonnementFonctionnalitiesRoutes = require('./src/routes/Abonnement/SellerAbonnementFonctionnalitiesRoutes.js');
const abonnementUserRouter = require('./src/routes/Abonnement/AbonnementUserRouter.js');
const abonnementFonctionnalityRoutes = require('./src/routes/Abonnement/AbonnementFonctionnalityRoutes.js');
const fonctionnalityRoutes = require('./src/routes/Abonnement/FonctionnalityRoutes.js');
const parcelleRoutes = require('./src/routes/Precision/parcelleRoutes.js');
const indiceRoutes = require('./src/routes/Precision/indiceRoutes.js');
const legendeRoutes = require('./src/routes/Precision/legendeRoutes.js');
const requestRoutes = require('./src/routes/Precision/requestRoutes');
const abonnementIndiceRoutes = require('./src/routes/Precision/abonnementIndiceRoutes.js');
const IndiceNdvi = require('./src/routes/Santinel/NdviRoutes.js');
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Default port if not specified in .env

// Middleware

app.use(cors({ origin: true, credentials: true })); // Allows cross-origin requests with credentials
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Supports form data

// Logging Middleware
// app.use((req, res, next) => {
//     console.log("Request Details:");
//     console.log(`- Method: ${req.method}`);
//     console.log(`- Path: ${req.path}`);
//     console.log(`- Headers: ${JSON.stringify(req.headers, null, 2)}`);
//     if (req.body && Object.keys(req.body).length) {
//         console.log(`- Body: ${JSON.stringify(req.body, null, 2)}`);
//     } else {
//         console.log("- Body: [No body data]");
//     }
//     next();
// });

// Middleware to serve static files (for images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api/auth', userAuth); // user-related routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/sellerRoles', sellerRoutes);
app.use('/api/userSellerRole', userSellerRoleRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/abonnement', abonnementRoutes);
app.use('/api/sellerAbonnement', sellerAbonnementRoutes);
app.use('/api/abonnementUser', abonnementUserRouter);
app.use('/api/sellerAbonnementUser', sellerAbonnementUserRoutes);
app.use('/api/sellerAbonnementFonctionality',SellerAbonnementFonctionnalitiesRoutes)
app.use('/api/abonnementFonctionnality', abonnementFonctionnalityRoutes);
app.use('/api/fonctionnality', fonctionnalityRoutes);
app.use('/api/parcelle', parcelleRoutes);
app.use('/api/indice', indiceRoutes);
app.use('/api/legende', legendeRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/abonnementIndice', abonnementIndiceRoutes);
app.use('/api/images', IndiceNdvi);



// Servir l'application React
// Placez ceci APRÈS toutes vos routes d'API, mais AVANT la gestion des erreurs
app.use(express.static(path.join(__dirname, 'client/build')));

// Cette route doit être la dernière pour capturer toutes les autres requêtes et les diriger vers React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


sequelize
    .authenticate()
    .then(() => {
        return sequelize.sync({ force: false  }); 
    })
    .then(() => {
        app.listen(PORT, () => {
           
        });
    })
    .catch((error) => {
        console.error("Error initializing the database or server:", error);
    });
