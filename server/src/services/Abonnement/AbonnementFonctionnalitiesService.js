const AbonnementFonctionnalities = require('../../models/Abonement/AbonnementFonctionnalities');
const { sequelize } = require('../../config/config');
const  Abonnement  = require('../../models/Abonement/Abonnement');  // Adjust the path according to your project structure
const  Fonctionnalities  = require('../../models/Abonement/Fonctionnalities');  

class AbonnementFonctionnalitiesService {
  // Create a new entry in the junction table
  static async createEntry(abonnementId, fonctionnalityId, transaction = null) {
    try {
      const entry = await AbonnementFonctionnalities.create(
        { AbonnementId: abonnementId, FonctionnalityId: fonctionnalityId },
        { transaction }
      );
      return entry;
    } catch (error) {
      throw new Error(`Error creating entry: ${error.message}`);
    }
  }

  // Fetch all entries
  static async getAllEntries() {
    try {
      return await AbonnementFonctionnalities.findAll();
    } catch (error) {
      throw new Error(`Error fetching entries: ${error.message}`);
    }
  }

  // Delete an entry by abonnement and fonctionnality IDs
  static async deleteEntry(abonnementId, fonctionnalityId, transaction = null) {
    try {
      const entry = await AbonnementFonctionnalities.destroy({
        where: { AbonnementId: abonnementId, FonctionnalityId: fonctionnalityId },
        transaction,
      });

      return entry > 0 ? "Entry deleted successfully" : "Entry not found";
    } catch (error) {
      throw new Error(`Error deleting entry: ${error.message}`);
    }
  }

  // Fetch entries by abonnement ID
  static async getEntriesByAbonnementId(abonnementId) {
    try {
      return await AbonnementFonctionnalities.findAll({ where: { AbonnementId: abonnementId } });
    } catch (error) {
      throw new Error(`Error fetching entries by Abonnement ID: ${error.message}`);
    }
  }

  // Fetch entries by fonctionnality ID
  static async getEntriesByFonctionnalityId(fonctionnalityId) {
    try {
      return await AbonnementFonctionnalities.findAll({ where: { FonctionnalityId: fonctionnalityId } });
    } catch (error) {
      throw new Error(`Error fetching entries by Fonctionnality ID: ${error.message}`);
    }
  }

  static async getAllDetailedEntries() {
    try {
      const query = `
        SELECT 
          a.id AS abonnement_id, 
          a.nameAbonnement AS abonnement_name, 
          a.nameClient AS abonnement_description,
          a.prices ,
          f.id AS fonctionnalities_id, 
          f.name AS fonctionnalities_name, 
          f.psudo AS fonctionnalities_psudo
        FROM 
          AbonnementFonctionnalities af
        JOIN 
          Abonnement a ON af.AbonnementId = a.id
        JOIN 
          Fonctionnalities f ON af.FonctionnalityId = f.id
      `;

      const [results] = await sequelize.query(query);

      // Group functionalities by Abonnement
      const groupedResults = results.reduce((acc, row) => {
        const abonnementId = row.abonnement_id;

        if (!acc[abonnementId]) {
          acc[abonnementId] = {
            id: abonnementId,
            name: row.abonnement_name,
            description: row.abonnement_description,
            prices: row.prices,
            fonctionnalities: [],
          };
        }

        acc[abonnementId].fonctionnalities.push({
          id: row.fonctionnalities_id,
          name: row.fonctionnalities_name,
          psudo: row.fonctionnalities_psudo,
        });

        return acc;
      }, {});

      return Object.values(groupedResults);
    } catch (error) {
      throw new Error(`Error fetching detailed entries: ${error.message}`);
    }
  }
  

}

module.exports = AbonnementFonctionnalitiesService;
