const express = require('express');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');
const app = express();

app.use(cors());

const clientId = 'adf2e57b-9ef3-4cb8-9d7c-0fec4f7295d9';  // Replace with your actual Client ID
const clientSecret = 'c64XpXGujSbuTq7C710pWUXjaCP68oYi';  // Replace with your actual Client Secret
const apiUrl = 'https://services.sentinel-hub.com/api/v1/process';

// The request body as JSON
const requestBody = {
  "input": {
    "bounds": {
      "bbox": [
        2.932537,
        36.461184,
        2.935888,
        36.463558
      ]
    },
    "data": [
      {
        "dataFilter": {
          "timeRange": {
            "from": "2024-09-21T00:00:00Z",
            "to": "2024-10-21T23:59:59Z"
          }
        },
        "type": "sentinel-2-l2a"
      }
    ]
  },
  "output": {
    "width": 750,
    "height": 400,
    "responses": [
      {
        "identifier": "default",
        "format": {
          "type": "image/jpeg"
        }
      }
    ]
  },
  "evalscript": "//VERSION=3\nfunction setup() {\n  return {\n    input: [\"B04\", \"B08\"],  // Red (B04), NIR (B08)\n    output: { bands: 3 }\n  };\n}\n\nfunction evaluatePixel(sample) {\n  let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);\n\n  if (ndvi < 0.0) {\n    return [0.69, 0.37, 0.27];  // Brown color for negative NDVI\n  } else if (ndvi < 0.2) {\n    return [1, 1, 0];  // Yellow color for low NDVI\n  } else if (ndvi < 0.4) {\n    return [0.6, 0.8, 0.2];  // Light green for moderate NDVI\n  } else {\n    return [0, 0.6, 0.2];  // Dark green for high NDVI\n  }\n}\n"
  
};
// Function to get access token
const getAccessToken = async () => {
  const tokenUrl = 'https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post(tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to request data from Sentinel Hub
const getSentinelData = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'image/png',  // Adjust based on the response format you expect
      },
      responseType: 'arraybuffer'  // Since we are fetching an image
    });

    // Return the image data
    return response.data;
  } catch (error) {
    console.error('Error fetching Sentinel data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Basic welcome route
app.get('/', (req, res) => {
  res.send("Welcome to the Sentinel Hub API Server");
});

// Route to handle fetching the image from Sentinel Hub
app.get('/sentinel-image', async (req, res) => {
  try {
    const imageData = await getSentinelData();
    
    // Set the correct content type for the image (PNG)
    res.set('Content-Type', 'image/png');
    
    // Send the raw image data
    res.send(imageData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Sentinel data',
      error: error.message,
    });
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });


module.exports={getSentinelData}