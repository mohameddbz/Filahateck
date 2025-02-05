const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Fichiers en mémoire // ou ta configuration
  
const publicationController = require('./../../controllers/Publication/publicationController.js');
const { validateUser } = require('../../validations/User/registration');
const authMiddleware = require('../../middlewares/authMiddleware');

const publication_router = express.Router();

 publication_router.post('/add',authMiddleware,upload.array('images', 10),publicationController.createPublication);
 publication_router.get('/all', (req, res) => {
    console.log("rena f serveur ");
    res.status(200).json({ message: 'Liste des publications' });    
 });
module.exports = publication_router;