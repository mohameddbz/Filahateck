const express = require('express');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');
const app = express();
const fs = require('fs');

app.use(cors());

// const clientId = 'ed07ce84-0feb-4e99-a68f-0c3a18778de7';  // Replace with your actual Client ID
// const clientSecret = '9JntLFWdMwyOd0XPbHHyxzh5iQ2GCevW';  // Replace with your actual Client Secret
const clientId = 'sh-7f3c436b-ad28-4499-9aa7-ef0b24137878';
const clientSecret = 'R19m2axvdKB8povlYdwB8c2c5oE3JVP4';
// const apiUrl = 'https://services.sentinel-hub.com/api/v1/process';
const apiUrl = 'https://sh.dataspace.copernicus.eu/api/v1/process';

const evalscript = `
//VERSION=3
function setup() {
  return {
    input: [
      {
        bands: ["B04", "B08"],
      },
    ],
    output: {
      id: "default",
      bands: 3,
    },
  }
}

function evaluatePixel(sample) {
  let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04)

  if (ndvi < -0.5) return [0.05, 0.05, 0.05]
  else if (ndvi < -0.2) return [0.75, 0.75, 0.75]
  else if (ndvi < -0.1) return [0.86, 0.86, 0.86]
  else if (ndvi < 0) return [0.92, 0.92, 0.92]
  else if (ndvi < 0.025) return [1, 0.98, 0.8]
  else if (ndvi < 0.05) return [0.93, 0.91, 0.71]
  else if (ndvi < 0.075) return [0.87, 0.85, 0.61]
  else if (ndvi < 0.1) return [0.8, 0.78, 0.51]
  else if (ndvi < 0.125) return [0.74, 0.72, 0.42]
  else if (ndvi < 0.15) return [0.69, 0.76, 0.38]
  else if (ndvi < 0.175) return [0.64, 0.8, 0.35]
  else if (ndvi < 0.2) return [0.57, 0.75, 0.32]
  else if (ndvi < 0.25) return [0.5, 0.7, 0.28]
  else if (ndvi < 0.3) return [0.44, 0.64, 0.25]
  else if (ndvi < 0.35) return [0.38, 0.59, 0.21]
  else if (ndvi < 0.4) return [0.31, 0.54, 0.18]
  else if (ndvi < 0.45) return [0.25, 0.49, 0.14]
  else if (ndvi < 0.5) return [0.19, 0.43, 0.11]
  else if (ndvi < 0.55) return [0.13, 0.38, 0.07]
  else if (ndvi < 0.6) return [0.06, 0.33, 0.04]
  else return [0, 0.27, 0]
}
`;


// The request body as JSON
const requestBody = {
  "input": {
    "bounds": {
      "properties": {
        "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
      },
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
          "type": "image/jpeg",
          "quality": "80"
        }
      }
    ]
  },
  evalscript: evalscript,  
};
// Function to get access token
const getAccessToken = async () => {
  // const tokenUrl = 'https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token';
  const tokenUrl = 'https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token';

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

const fetchImage = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Accept: 'image/png',
      },
      responseType: 'arraybuffer', // Ensure the response is treated as binary data
    });

     return response.data;
    console.log('Image successfully saved as image.png');
  } catch (error) {
    console.error('Error fetching image:', error.response?.data || error.message);
  }
};

const fetchCatalogData = async () => {
  const api = 'https://services.sentinel-hub.com/api/v1/catalog/search';
  const accessToken = await getAccessToken();

  const request = {
    "bbox": [
      2.932537,
      36.461184,
      2.935888,
      36.463558
    ],
    "datetime": "2024-01-01T00:00:00Z/2024-01-31T23:59:59Z",
    "query": {
      "eo:cloud_cover": { "lt": 10 }
    },
    "collections": ["sentinel-2-l1c"],
    "limit": "10"
  };

  try {
    const response = await axios.post(api, request, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Catalog Data:', response.data);
  } catch (error) {
    console.error('Error fetching Catalog data:', error.message);
  }
};

// Basic welcome route
app.get('/', (req, res) => {
  fetchCatalogData();
  res.send("Welcome to the Sentinel Hub API Server");
});

// Route to handle fetching the image from Sentinel Hub
app.get('/sentinel-image', async (req, res) => {
  try {
    const imageData = await fetchImage();
    
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
const PORT = process.env.PORT || 9000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });


module.exports={fetchImage}