const AbonnementFonctionnalitiesService = require('../../services/Abonnement/AbonnementFonctionnalitiesService');

class AbonnementFonctionnalitiesController {
  // Create an entry in AbonnementFonctionnalities
  static async create(req, res) {
    const { abonnementId, fonctionnalityId } = req.body;

    if (!abonnementId || !fonctionnalityId) {
      return res.status(400).json({ error: "abonnementId and fonctionnalityId are required." });
    }

    try {
      const entry = await AbonnementFonctionnalitiesService.createEntry(abonnementId, fonctionnalityId);
      return res.status(201).json({ message: "Entry created successfully", data: entry });
    } catch (error) {
      return res.status(500).json({ error: `Failed to create entry: ${error.message}` });
    }
  }

  // Get all entries in AbonnementFonctionnalities
  static async getAll(req, res) {
    try {
      const entries = await AbonnementFonctionnalitiesService.getAllEntries();
      return res.status(200).json({ message: "Entries retrieved successfully", data: entries });
    } catch (error) {
      return res.status(500).json({ error: `Failed to retrieve entries: ${error.message}` });
    }
  }

  // Delete an entry from AbonnementFonctionnalities
  static async delete(req, res) {
    const { abonnementId, fonctionnalityId } = req.body;

    if (!abonnementId || !fonctionnalityId) {
      return res.status(400).json({ error: "abonnementId and fonctionnalityId are required." });
    }

    try {
      const message = await AbonnementFonctionnalitiesService.deleteEntry(abonnementId, fonctionnalityId);
      return res.status(200).json({ message });
    } catch (error) {
      return res.status(500).json({ error: `Failed to delete entry: ${error.message}` });
    }
  }

  static async getAllDetailed(req, res) {
    try {
      const entries = await AbonnementFonctionnalitiesService.getAllDetailedEntries();
      return res.status(200).json(entries);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AbonnementFonctionnalitiesController;
