const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { fetchNdwiImage } = require('./../../services/Santinel/NdwiService');
const requestService = require('./../../services/Precision/requestService');

async function createNdwiRequest(req, res) {
  const { bbox, startDate, endDate, width, height, user_id, indice_id, parcelle_id } = req.body;

  if (!bbox || !startDate || !endDate || !width || !height || !user_id || !indice_id || !parcelle_id) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const timeRange = {
    from: `${startDate}T00:00:00Z`,
    to: `${endDate}T23:59:59Z`
  };

  try {
    // Fetch NDWI image
    const imageData = await fetchNdwiImage(
      JSON.parse(bbox),
      timeRange,
      { width: parseInt(width), height: parseInt(height) }
    );

    if (!imageData) {
      return res.status(404).json({ message: 'No image data returned.' });
    }

    // Ensure upload directory exists
    const uploadDir = path.resolve(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Save image
    const imageName = `ndwi-image-${uuidv4()}.jpg`;
    const imagePath = path.join(uploadDir, imageName);
    fs.writeFileSync(imagePath, imageData);

    // Construct image URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageName}`;

    // Prepare request data for DB
    const requestData = {
      dateDebut: startDate,
      dateFin: endDate,
      imageUrl,
      user_id,
      indice_id,
      parcelle_id,
    };

    // Insert request into DB
    const createdRequest = await requestService.createRequest(requestData);

    return res.status(201).json({
      message: 'NDWI request created successfully.',
      data: createdRequest,
    });
  } catch (error) {
    console.error('Error in createNdwiRequest:', error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createNdwiRequest };
