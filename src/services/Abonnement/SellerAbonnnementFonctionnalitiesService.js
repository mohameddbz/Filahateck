const SellerAbonnementFonctionnalities = require('../../models/Abonement/SellerAbonnementFonctionnalities');
const { sequelize } = require('../../config/config');
const SellerAbonnement = require('../../models/Abonement/SellerAbonnement');  // Modèle SellerAbonnement
const Fonctionnalities = require('../../models/Abonement/Fonctionnalities');  // Modèle Fonctionnalities

class SellerAbonnementFonctionnalitiesService {
  // Créer une nouvelle entrée dans la table de jointure
  static async createEntry(sellerabonnementid, fonctionnalityid, transaction = null) {
    try {
      const entry = await SellerAbonnementFonctionnalities.create(
        { sellerabonnementid, fonctionnalityid },
        { transaction }
      );
      return entry;
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'entrée : ${error.message}`);
    }
  }

  // Récupérer toutes les entrées
  static async getAllEntries() {
    try {
      return await SellerAbonnementFonctionnalities.findAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entrées : ${error.message}`);
    }
  }

  // Supprimer une entrée par sellerabonnementid et fonctionnalityid
  static async deleteEntry(sellerabonnementid, fonctionnalityid, transaction = null) {
    try {
      const entry = await SellerAbonnementFonctionnalities.destroy({
        where: { sellerabonnementid, fonctionnalityid },
        transaction,
      });

      return entry > 0 ? "Entrée supprimée avec succès" : "Entrée non trouvée";
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'entrée : ${error.message}`);
    }
  }

  // Récupérer les entrées par sellerabonnementid
  static async getEntriesBySellerAbonnementId(sellerabonnementid) {
    try {
      return await SellerAbonnementFonctionnalities.findAll({ where: { sellerabonnementid } });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entrées par sellerabonnementid : ${error.message}`);
    }
  }

  // Récupérer les entrées par fonctionnalityid
  static async getEntriesByFonctionnalityId(fonctionnalityid) {
    try {
      return await SellerAbonnementFonctionnalities.findAll({ where: { fonctionnalityid } });
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entrées par fonctionnalityid : ${error.message}`);
    }
  }

  // Récupérer toutes les entrées détaillées
  static async getAllDetailedEntries() {
    try {
      const query = `
        SELECT 
          sa.id AS sellerabonnement_id, 
          sa.nameAbonnement AS sellerabonnement_name, 
          sa.price AS sellerabonnement_price,
          f.id AS fonctionnalities_id, 
          f.name AS fonctionnalities_name, 
          f.psudo AS fonctionnalities_psudo
        FROM 
          sellerabonnementfonctionnalities saf
        JOIN 
          sellerabonnement sa ON saf.sellerabonnementid = sa.id
        JOIN 
          fonctionnalities f ON saf.fonctionnalityid = f.id
      `;

      const [results] = await sequelize.query(query);

      // Grouper les fonctionnalités par SellerAbonnement
      const groupedResults = results.reduce((acc, row) => {
        const sellerabonnementId = row.sellerabonnement_id;

        if (!acc[sellerabonnementId]) {
          acc[sellerabonnementId] = {
            id: sellerabonnementId,
            name: row.sellerabonnement_name,
            price: row.sellerabonnement_price,
            fonctionnalities: [],
          };
        }

        acc[sellerabonnementId].fonctionnalities.push({
          id: row.fonctionnalities_id,
          name: row.fonctionnalities_name,
          psudo: row.fonctionnalities_psudo,
        });

        return acc;
      }, {});

      return Object.values(groupedResults);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entrées détaillées : ${error.message}`);
    }
  }
}

module.exports = SellerAbonnementFonctionnalitiesService;