const { v4: uuidv4 } = require('uuid');  // Importer la fonction pour générer un UUID
const fs = require('fs');
const path = require('path');

const Publication = require('./../../models/Publication/Publication');
const ImagePublication = require('./../../models/ImagePublication/ImagePublication');

const createPublication = async (req, res) => {
    try {
     const user_id = req.user.user_id ; 
        const { productName, quantity, price, location, phone } = req.body;
        const publicationData = {
         nomProduit : productName,
         quantité :quantity,
         prixUnitaire : price,
         addresse : location,
         phoneNumber : phone,
         user_id,  
     };
       const response = await Publication.insertPublication(publicationData); 
       if (response) {
         const publicationId = response.dataValues.id;
         const files = req.files;
         const filePaths = [];
         if (files && files.length > 0) {
             
             for (let i = 0; i < files.length; i++) {
                 const file = files[i];
                 const uniqueId = uuidv4(); 
                 const fileName = `${uniqueId}-${Date.now()}-${file.originalname}`;
                 const filePath = path.join(__dirname, '../../../uploads/publications', fileName);
                 fs.writeFileSync(filePath, file.buffer); // Sauvegarde dans le dossier 'uploads/'
                 const responseImageInsertion  = await  ImagePublication.insertImage(publicationId, fileName);
                 filePaths.push(filePath);
             }
         }
 
         res.status(200).json({
             message: 'Publication créée avec succès',
             data: req.body,
             files: filePaths 
         });
       }else{
         // erreur dans l'insertion donc on doit pas inserer les photos dans le backend et meme dans la table imagePub
         console.error('Erreur lors de la création de la publication:', error);
         res.status(404).json({ message: 'Erreur lors de l insertion de la publication ' });
       }
      
       
    } catch (error) {
        console.error('Erreur lors de la création de la publication:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


const getAllPublications = async (req, res) => {
  
      try {
        const publications = await Publication.findAll({
          include: [
            {
              model: ImagePublication,
              as: 'images', // Doit correspondre à l'alias défini dans `hasMany`
              attributes: ['id', 'imagePath'], // Retourner seulement les champs nécessaires
            },
          ],
        });
    
        return res.status(200).json(publications);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
  };
    


module.exports = { createPublication ,getAllPublications };