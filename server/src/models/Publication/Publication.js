const { DataTypes } = require('sequelize');
const { sequelize } = require('./../../config/config');
const { Op } = require('sequelize'); 


const User = require('./../User/User');
const SellerAbonnementUser = require('./../Abonement/SellerAbonnementUser');
const SellerAbonnement = require('./../Abonement/SellerAbonnement');
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

Publication.belongsTo(SellerAbonnementUser, { foreignKey: 'sellerAbonnementUserId', allowNull: false });
SellerAbonnementUser.hasMany(Publication, { foreignKey: 'sellerAbonnementUserId' });

// Publication.insertPublication = async function (publicationData) {
//     try {
//         const publication = await Publication.create(publicationData);
//         return publication;
//     } catch (error) {
//         console.error('Erreur lors de l\'insertion de la publication:', error);
//         throw error;  
//     }
// };

Publication.insertPublication = async function (publicationData, userId) {

    const transaction = await sequelize.transaction(); // 🛑 Démarrer une transaction
  
    try {
      // 🔹 Récupérer l'abonnement actif du vendeur
      const sellerAbonnementUser = await SellerAbonnementUser.findOne({
        where: { 
            id : publicationData.sellerAbonnementUserId ,
            userId  ,
             etat :"actif",
             dateDebut: {
                [Op.lte]: new Date(), // dateDebut <= NOW()
              },
              dateFin: {
                [Op.gte]: new Date(), // dateFin >= NOW()
              },},
        include: [{ model: SellerAbonnement }], // Inclure les infos de l’abonnement
        transaction
      });
  
      if (!sellerAbonnementUser) {
        return { message: "Aucun abonnement actif trouvé pour cet utilisateur.", status: 404 };
      }
  
      // 🔹 Vérifier la limite de publications
      if(sellerAbonnementUser.SellerAbonnement.isLimited ===1 ) {
        if (sellerAbonnementUser.nbPost >= sellerAbonnementUser.SellerAbonnement.nbPost) {
            return {message:"Vous avez attient la limite de nombre de publication",status:401}
     
           }
      }
      else {
            // 🔹 Créer la publication
            const publication = await Publication.create(publicationData, { transaction });
            // 🔹 Incrémenter le nombre de publications dans SellerAbonnementUser
            await sellerAbonnementUser.update(
            { nbPost: sellerAbonnementUser.nbPost + 1 },
            { transaction }
            );

            // ✅ Valider la transaction
            await transaction.commit();
            return {  message:"Publication créee avec succes" , status:201 ,publication:publication} ;
      }
  
      
    } catch (error) {
      await transaction.rollback();
      console.error("Erreur lors de la création de la publication :", error);
      return { message: "Erreur serveur lors de la création de la publication", status: 500 };
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
