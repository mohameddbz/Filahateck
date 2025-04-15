const fs = require('fs');
const path = require('path');
const  ImagePublication  = require('./../../models/ImagePublication/ImagePublication'); // Importez votre modèle ImagePublication

/**
 * @param {number[]} deletedImageIds - Les IDs des images à supprimer.
 */
const deleteImagesByIds = async (deletedImageIds) => {
  try {
    const imagesToDelete = await ImagePublication.findAll({
      where: { id: deletedImageIds },
      attributes: ['imagePath'], 
    });

    // Supprimer les fichiers du répertoire uploads/publications
    imagesToDelete.forEach((image) => {
      const filePath = path.join('./../../../uploads/publications', image.imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Supprimer le fichier
        console.log(`Fichier supprimé : ${filePath}`);
      } else {
        console.warn(`Fichier non trouvé : ${filePath}`);
      }
    });

    // supprimer toute ensemble 
    await ImagePublication.destroy({
      where: { id: deletedImageIds },
    });

    console.log('Images supprimées avec succès.');
  } catch (error) {
    console.error('Erreur lors de la suppression des images :', error);
    throw error;
  }
};

module.exports = { deleteImagesByIds };