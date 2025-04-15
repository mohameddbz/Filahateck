const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const Publication = require('./../Publication/Publication');

const ImagePublication = sequelize.define(
    'ImagePublications',
    {
        imagePath: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Relation avec Publication
ImagePublication.belongsTo(Publication, { foreignKey: 'publicationId' , allowNull: false });
Publication.hasMany(ImagePublication, { foreignKey: 'publicationId', as : 'images', onDelete: 'CASCADE' });


ImagePublication.insertImage = async (publicationId, imagePath) => {
    try {
        const image = await ImagePublication.create({ publicationId, imagePath });
        return image;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'image:", error);
        throw error;
    }
};

ImagePublication.deleteImagesByPublicationId = async (publicationId) => {
    try {
        await ImagePublication.destroy({ where: { publicationId } });
    } catch (error) {
        console.error("Erreur lors de la suppression des images:", error);
        throw error;
    }
}


ImagePublication.getImagesByPublicationId = async (publicationId) => {
    try {
        const images = await ImagePublication.findAll({ where: { publicationId } });
        return images;
    } catch (error) {
        console.error("Erreur lors de la récupération des images:", error);
        throw error;
    }
};

ImagePublication.deleteImagesNotInList = async function (publicationId, imageList) {
    try {
      // Supprimer les images qui ne sont pas dans la liste
      await ImagePublication.destroy({
        where: {
          publicationId: publicationId, // Filtrer par ID de publication
          imagePath: { [Op.notIn]: imageList }, // Supprimer les images qui ne sont pas dans la liste
        },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression des images:', error);
      throw error;
    }
  };

module.exports = ImagePublication;
