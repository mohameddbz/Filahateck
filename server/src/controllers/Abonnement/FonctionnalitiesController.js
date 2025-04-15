const FonctionnalitiesService = require('../../services/Abonnement/FonctionnalitiesService');


  const create = async (req, res) => {
    try {
      const result = await FonctionnalitiesService.createFonctionnality(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const getAll = async(req, res) => {
    try {
      const result = await FonctionnalitiesService.getAllFonctionnalities();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const getById = async(req, res) => {
    try {
      const result = await FonctionnalitiesService.getFonctionnalityById(req.params.id);
      if (!result) return res.status(404).json({ message: 'Fonctionnality not found' });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const update = async (req, res) =>{
    try {
      const result = await FonctionnalitiesService.updateFonctionnality(req.params.id, req.body);
      const update = await FonctionnalitiesService.getFonctionnalityById(req.params.id);
      res.status(200).json({ message: 'Fonctionnality updated successfully', update });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const suprimer = async (req, res) => {
    try {
      await FonctionnalitiesService.deleteFonctionnality(req.params.id);
      res.status(200).json({ message: 'Fonctionnality deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


module.exports = {
  suprimer,
  update,
  getById,
  getAll,
  create
} ;
