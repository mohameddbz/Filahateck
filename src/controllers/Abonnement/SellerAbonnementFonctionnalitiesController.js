const SellerAbonnementFonctionnalitiesService = require('../../services/Abonnement/SellerAbonnnementFonctionnalitiesService');

class SellerAbonnementFonctionnalitiesController {
  // Créer une entrée dans SellerAbonnementFonctionnalities
  static async create(req, res) {
    const { sellerabonnementid,fonctionnalityId } = req.body;

    console.log(sellerabonnementid,fonctionnalityId)

    if (!sellerabonnementid || !fonctionnalityId) {
      return res.status(400).json({ error: "sellerabonnementid et fonctionnalityid sont requis." });
    }

    try {
      const entry = await SellerAbonnementFonctionnalitiesService.createEntry(sellerabonnementid, fonctionnalityId);
      return res.status(201).json({ message: "Entrée créée avec succès", data: entry });
    } catch (error) {
      return res.status(500).json({ error: `Échec de la création de l'entrée : ${error.message}` });
    }
  }

  // Récupérer toutes les entrées dans SellerAbonnementFonctionnalities
  static async getAll(req, res) {
    try {
      const entries = await SellerAbonnementFonctionnalitiesService.getAllEntries();
      return res.status(200).json({ message: "Entrées récupérées avec succès", data: entries });
    } catch (error) {
      return res.status(500).json({ error: `Échec de la récupération des entrées : ${error.message}` });
    }
  }

  // Supprimer une entrée de SellerAbonnementFonctionnalities
  static async delete(req, res) {
    const { sellerabonnementid, fonctionnalityid } = req.body;

    if (!sellerabonnementid || !fonctionnalityid) {
      return res.status(400).json({ error: "sellerabonnementid et fonctionnalityid sont requis." });
    }

    try {
      const message = await SellerAbonnementFonctionnalitiesService.deleteEntry(sellerabonnementid, fonctionnalityid);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({ error: `Échec de la suppression de l'entrée : ${error.message}` });
    }
  }

  // Récupérer toutes les entrées détaillées
  static async getAllDetailed(req, res) {
    try {
      const entries = await SellerAbonnementFonctionnalitiesService.getAllDetailedEntries();
      return res.status(200).json(entries);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SellerAbonnementFonctionnalitiesController;