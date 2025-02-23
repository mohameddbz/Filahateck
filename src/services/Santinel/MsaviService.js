const axios = require('axios');
const { getAccessToken } = require('./../../config/santinelConfig');

const apiUrl = 'https://sh.dataspace.copernicus.eu/api/v1/process';

const fetchMsaviImage = async (bbox, timeRange, { width, height }) => {
  // Evalscript for MSAVI using Sentinel-2 bands:
  // NIR: B08, Red: B04.
  const evalscript = `
  //VERSION=3
  function setup() {
    return {
      input: [
        {
          bands: ["B08", "B04"],
        },
      ],
      output: {
        id: "default",
        bands: 3,
      },
    }
  }
  
  function evaluatePixel(sample) {
    // Calculate MSAVI using: (2*NIR + 1 - sqrt((2*NIR + 1)^2 - 8*(NIR - Red))) / 2
    let NIR = sample.B08;
    let Red = sample.B04;
    let numerator = 2 * NIR + 1;
    let msavi = (numerator - Math.sqrt(numerator * numerator - 8 * (NIR - Red))) / 2;
    
    // Map MSAVI values to colors (example mapping; adjust thresholds and colors as needed)
    if (msavi < 0) return [0.1, 0.1, 0.1];
    else if (msavi < 0.2) return [0.6, 0.6, 0.6];
    else if (msavi < 0.4) return [0.8, 0.8, 0.8];
    else if (msavi < 0.6) return [0.4, 0.9, 0.4];
    else if (msavi < 0.8) return [0.2, 0.8, 0.2];
    else return [0, 0.6, 0];
  }
  `;

  const requestBody = {
    input: {
      bounds: {
        properties: { crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84" },
        bbox,
      },
      data: [
        {
          type: "sentinel-2-l2a",
          dataFilter: { timeRange },
        },
      ],
    },
    output: {
      width,
      height,
      responses: [
        {
          identifier: "default",
          format: { type: "image/jpeg", quality: 80 },
        },
      ],
    },
    evalscript,
  };

  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "image/jpeg",
      },
      responseType: "arraybuffer",
    });

    console.log("MSAVI image fetched successfully from Sentinel API");
    return response.data;
  } catch (error) {
    console.error("Error fetching MSAVI image from Sentinel API:", error.message);
    throw new Error("MSAVI image fetching failed.");
  }
};

module.exports = { fetchMsaviImage };
