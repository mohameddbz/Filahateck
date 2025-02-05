const { v4: uuidv4 } = require('uuid');  // Importer la fonction pour générer un UUID
const fs = require('fs');
const path = require('path');

const Publication = require('./../../models/Publication/Publication');

const createPublication = async (req, res) => {
    try {

   //      const { productName, quantity, price, location, phone } = req.body;
   //      const publicationData = {
   //       nomProduit : productName,
   //       quantité :quantity,
   //       prixUnitaire : price,
   //       addresse : location,
   //       phoneNumber : phone,
   //       user_id,  // Assurez-vous que 'user_id' existe dans req.body ou récupérez-le d'une autre manière
   //   };
        console.log('Body:', req.body);
        const files = req.files;
        console.log('Fichiers:', files);
        const filePaths = [];
        if (files && files.length > 0) {
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const uniqueId = uuidv4();  // Générer un UUID
                const filePath = path.join(__dirname, '../../../uploads/publications', `${uniqueId}-${Date.now()}-${file.originalname}`);
                // Sauvegarder le fichier sur le disque
                fs.writeFileSync(filePath, file.buffer); // Sauvegarde dans le dossier 'uploads/'
                filePaths.push(filePath);
            }

            console.log('Fichiers enregistrés à:', filePaths);
        }

        res.status(200).json({
            message: 'Publication créée avec succès',
            data: req.body,
            files: filePaths 
        });
    } catch (error) {
        console.error('Erreur lors de la création de la publication:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { createPublication };