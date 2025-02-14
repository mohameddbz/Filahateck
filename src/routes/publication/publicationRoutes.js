const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Fichiers en mémoire // ou ta configuration
  
const publicationController = require('./../../controllers/Publication/publicationController.js');
const { validateUser } = require('../../validations/User/registration');
const authMiddleware = require('../../middlewares/authMiddleware');

const publication_router = express.Router();

 publication_router.post('/add',authMiddleware,upload.array('images', 10),publicationController.createPublication);
 publication_router.get('/all', publicationController.getAllPublications);
 publication_router.get('/one/:id', publicationController.getPublicationById);
 publication_router.get('/my-publications', authMiddleware, publicationController.getPublicationsOfUser);
 publication_router.put('/update/:id', authMiddleware, upload.array('images', 10), publicationController.updatePublication);
module.exports = publication_router;