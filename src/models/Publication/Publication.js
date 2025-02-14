const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const User = require('./../User/User');

const Publication = sequelize.define(
    'Publication',
    {
        datePublication: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        nomProduit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantité: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prixUnitaire: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,  // ca depend hnaya 
        },
        addresse : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        etat: {
            type: DataTypes.ENUM('DISPO', 'NONDISPO'),
            allowNull: false,
            defaultValue: 'DISPO',
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Relation avec User
Publication.belongsTo(User, { foreignKey: 'user_id', allowNull: false });
User.hasMany(Publication, { foreignKey: 'user_id' });


Publication.insertPublication = async function (publicationData) {
    try {
        const publication = await Publication.create(publicationData);
        return publication;
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la publication:', error);
        throw error;  
    }
};

Publication.updatePublication= async function ( publicationId,publicationData ) {

    try {
        const publication = await Publication.update(publicationData, {
            where: { id: publicationId },
        });
        return publication;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la publication:', error);
        throw error;
    }
};
module.exports = Publication;
