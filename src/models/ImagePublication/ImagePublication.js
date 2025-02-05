const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const Publication = require('./../Publication/Publication');

const ImagePublication = sequelize.define(
    'ImagePublication',
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
ImagePublication.belongsTo(Publication, { foreignKey: 'publicationId', allowNull: false });
Publication.hasMany(ImagePublication, { foreignKey: 'publicationId', onDelete: 'CASCADE' });

module.exports = ImagePublication;
