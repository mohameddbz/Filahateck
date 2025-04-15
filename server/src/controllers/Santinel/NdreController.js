const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { fetchNdreImage } = require('./../../services/Santinel/NdreService'); // Ensure you have NDRE service implemented
const requestService = require('./../../services/Precision/requestService'); 
const { sequelize } = require('../../config/config'); 

async function createNdreRequest(req, res) {
  const { bbox, startDate, endDate, width, height, user_id, indice_id, parcelle_id } = req.body;

  if (!bbox || !startDate || !endDate || !width || !height || !user_id || !indice_id || !parcelle_id) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // Fetch subscription details
    const subscriptionQuery = `
      SELECT ai.nombre_de_requete
      FROM abonnement_indice ai
      JOIN abonnementusers a ON ai.AbonnementId = a.abn_id
      WHERE a.user_id = :user_id AND ai.IndiceId = :indice_id
      LIMIT 1;
    `;
    const subscription = await sequelize.query(subscriptionQuery, {
      replacements: { user_id, indice_id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (subscription.length === 0) {
      return res.status(403).json({ message: "Aucun abonnement trouvé pour cet utilisateur et pour NDRE." });
    }

    const nombreDeRequetes = 15; // or subscription[0].nombre_de_requete;
    if (nombreDeRequetes <= 0) {
      return res.status(403).json({ message: "Votre abonnement ne permet aucune requête pour NDRE." });
    }

    const daysBetweenRequests = Math.floor(30 / nombreDeRequetes);
    const lastRequestQuery = `
      SELECT created_at FROM requests
      WHERE user_id = :user_id AND indice_id = :indice_id AND parcelle_id = :parcelle_id
      ORDER BY created_at DESC
      LIMIT 1;
    `;
    const lastRequest = await sequelize.query(lastRequestQuery, {
      replacements: { user_id, indice_id, parcelle_id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (lastRequest.length > 0) {
      const lastRequestDate = new Date(lastRequest[0].created_at);
      const nextAvailableDate = new Date(lastRequestDate);
      nextAvailableDate.setDate(nextAvailableDate.getDate() + daysBetweenRequests);
      if (new Date() < nextAvailableDate) {
        return res.status(403).json({
          message: `Vous devez attendre ${daysBetweenRequests} jours avant une nouvelle requête pour NDRE.`,
          nextAvailableDate: nextAvailableDate.toISOString(),
        });
      }
    }

    const timeRange = {
      from: `${startDate}T00:00:00Z`,
      to: `${endDate}T23:59:59Z`
    };

    const imageData = await fetchNdreImage(
      JSON.parse(bbox),
      timeRange,
      { width: parseInt(width), height: parseInt(height) }
    );

    if (!imageData) {
      return res.status(404).json({ message: 'No NDRE image data returned.' });
    }

    const uploadDir = path.resolve(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const imageName = `ndre-image-${uuidv4()}.jpg`;
    const imagePath = path.join(uploadDir, imageName);
    fs.writeFileSync(imagePath, imageData);
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;

    const requestData = {
      dateDebut: startDate,
      dateFin: endDate,
      imageUrl,
      user_id,
      indice_id,
      parcelle_id,
    };

    const createdRequest = await requestService.createRequest(requestData);
    return res.status(201).json({
      message: 'Request created successfully for NDRE.',
      data: createdRequest,
    });
  } catch (error) {
    console.error('Error in createNdreRequest:', error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createNdreRequest };
