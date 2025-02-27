const { v4: uuidv4 } = require('uuid');  // Importer la fonction pour générer un UUID
const fs = require('fs');
const path = require('path');

const Publication = require('./../../models/Publication/Publication');
const ImagePublication = require('./../../models/ImagePublication/ImagePublication');
const { deleteImagesByIds } = require('./../../services/Publication/ImagePublication'); 

const createPublication = async (req, res) => {
  // il faut verifier les données envoyer du backend , il faut aussi incrementer le nombre de post 
    try {
     const user_id = req.user.user_id ; 
        const { productName, quantity, price, location, phone ,sellerAbonnementUserId } = req.body;
        const publicationData = {
         nomProduit : productName,
         quantité :quantity,
         prixUnitaire : price,
         addresse : location,
         phoneNumber : phone,
         user_id,  
         sellerAbonnementUserId
     };
       const response = await Publication.insertPublication(publicationData,user_id); 

       if(response.status === 401 ){
        console.log("rena ndekhlo win lezem ----->")
            res.status(401).json({
              message:response.message 
              // message : "yew m3ndekch abonnement sobhan lah ! "
            })
       }else if (response.status === 201 ) {
        console.log("rew ydkhol dekhel if te3 status correct ----->",response.publication)
        const publicationId = response.publication.id;

        const files = req.files;
        const filePaths = [];
        if (files && files.length > 0) {
          console.log("rew yedkhol dekhel sema kyn files ---------->",files)
            for (let i = 0 ; i < files.length; i++) {
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
       }
      //  if (response) {
         
      //  }else{
      //    // erreur dans l'insertion donc on doit pas inserer les photos dans le backend et meme dans la table imagePub
      //    console.error('Erreur lors de la création de la publication:', error);
      //    res.status(404).json({ message: 'Erreur lors de l insertion de la publication ' });
      //  }
      
       
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
              as: 'images', 
              attributes: ['id', 'imagePath'], 
            },
          ],
        });
    
        return res.status(200).json(publications);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
  };

  const getPublicationById = async (req, res) => {
    const { id } = req.params; 
  //  console.log('id',id);
    try {
      const publication = await Publication.findOne({
        where: { id },
        include: [
          {
            model: ImagePublication,
            as: 'images',
            attributes: ['id', 'imagePath'],
       },
        ],
      });
  
      if (!publication) {
        return res.status(404).json({ message: 'Publication non trouvée' });
      }
      // console.log(publication);
      return res.status(200).json(publication);
    } catch (error) {
      console.error('Erreur lors de la récupération de la publication:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };


   const getPublicationsOfUser = async (req,res) =>{
       const user_id = req.user.user_id;
      try {
        const count = await Publication.count({ where: { user_id } });

        if (count === 0) {
            return res.status(205).json({ message: "Aucune publication trouvée.", publications: [] });
        }

        const publications = await Publication.findAll({
          where: { user_id: user_id }, 
          include: [
            {
              model: ImagePublication,
              as: 'images', // Doit correspondre à l'alias défini dans `hasMany`
              attributes: ['id', 'imagePath'], // Retourner seulement les champs nécessaires
            },
          ],
        });
        console.log('publications of user li m3ndoch is ? ',publications);
        return res.status(200).json(publications);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
      }
   }
  



   const updatePublication = async (req, res) => {
    // console.log('Début de la mise à jour de la publication');
    try {
      const publicationId = req.params.id; // Récupérer l'ID de la publication à mettre à jour
      const user_id = req.user.user_id; // Récupérer l'ID de l'utilisateur connecté
      const { productName, quantity, price, location, phone, deletedImageIds } = req.body; // Récupérer les données du formulaire
    //  console.log("deletedImageI -->> ",deletedImageIds); 
      // Validation des données
      if (!productName || !quantity || !price || !location || !phone) {
        return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
      }
  
      // Données de la publication à mettre à jour
      const publicationData = {
        nomProduit: productName,
        quantité: quantity,
        prixUnitaire: price,
        addresse: location,
        phoneNumber: phone,
        user_id,
      };
  
      // console.log('Données de la publication :', publicationData);

      const updatedPublication = await Publication.updatePublication(publicationId, publicationData);
  
      if (!updatedPublication) {
        return res.status(404).json({ message: 'Publication non trouvée' });
      }
      if (deletedImageIds && deletedImageIds.length > 0) {
        await  deleteImagesByIds(deletedImageIds);
      }
  
      // Gestion des images
      const files = req.files; // Récupérer les nouvelles images téléchargées
  
  
      // Ajouter les nouvelles images
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const uniqueId = uuidv4(); // Générer un ID unique pour le nom du fichier
          const fileName = `${uniqueId}-${Date.now()}-${file.originalname}`;
          const filePath = path.join(__dirname, '../../../uploads/publications', fileName);
  
          fs.writeFileSync(filePath, file.buffer);
  
          await ImagePublication.insertImage(publicationId, fileName);
        }
      }
  
      res.status(200).json({
        message: 'Publication mise à jour avec succès',
        data: publicationData,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la publication:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };





  //  const updatePublication = async (req, res) => {
  //   console.log('rena f update ');
  //   try {
  //     const publicationId = req.params.id; // Récupérer l'ID de la publication à mettre à jour
  //     const user_id = req.user.user_id; // Récupérer l'ID de l'utilisateur connecté
  //     const { productName, quantity, price, location, phone , existingImages  } = req.body; // Récupérer les données du formulaire
  //     // Données de la publication à mettre à jour
  //     const publicationData = {
  //       nomProduit: productName,
  //       quantité: quantity,
  //       prixUnitaire: price,
  //       addresse: location,
  //       phoneNumber: phone,
  //       user_id,
  //     };
  //     console.log(publicationData)
  
  //     // Mettre à jour la publication dans la base de données
  //     const updatedPublication = await Publication.updatePublication(publicationId, publicationData);
  
  //     if (!updatedPublication) {
  //       return res.status(404).json({ message: 'Publication non trouvée' });
  //     }
  
  //     // Gestion des images
  //     const files = req.files; // Récupérer les nouvelles images téléchargées
  //     const filePaths = [];
     

  //     if (files && files.length > 0) {
  //       // Supprimer les anciennes images associées à la publication (optionnel)
  //       await ImagePublication.deleteImagesByPublicationId(publicationId);
  
  //       // Ajouter les nouvelles images
  //       for (let i = 0; i < files.length; i++) {
  //         const file = files[i];
  //         const uniqueId = uuidv4(); // Générer un ID unique pour le nom du fichier
  //         const fileName = `${uniqueId}-${Date.now()}-${file.originalname}`;
  //         const filePath = path.join(__dirname, '../../../uploads/publications', fileName);
  
  //         // Sauvegarder le fichier dans le dossier 'uploads/publications'
  //         fs.writeFileSync(filePath, file.buffer);
  
  //         // Insérer le chemin de l'image dans la base de données
  //         await ImagePublication.insertImage(publicationId, fileName);
  //         filePaths.push(filePath);
  //       }
  //     }
  
  //     // Retourner une réponse de succès
  //     res.status(200).json({
  //       message: 'Publication mise à jour avec succès',
  //       data: publicationData,
  //       files: filePaths,
  //     });
  //   } catch (error) {
  //     console.error('Erreur lors de la mise à jour de la publication:', error);
  //     res.status(500).json({ message: 'Erreur serveur' });
  //   }
  // };
  



module.exports = { createPublication ,getAllPublications,getPublicationById ,getPublicationsOfUser,updatePublication};