const axios = require('axios');
const { getAccessToken } = require('./../../config/santinelConfig');

const apiUrl = 'https://sh.dataspace.copernicus.eu/api/v1/process';

const fetchNdwiImage = async (bbox, timeRange, { width, height }) => {
  const evalscript = `
  //VERSION=3
  function setup() {
    return {
      input: [
        {
          bands: ["B03", "B08"],
        },
      ],
      output: {
        id: "default",
        bands: 3,
      },
    }
  }

  function evaluatePixel(sample) {
    let ndwi = (sample.B03 - sample.B08) / (sample.B03 + sample.B08);

    if (ndwi < -0.5) return [0.05, 0.05, 0.05];
    else if (ndwi < -0.2) return [0.75, 0.75, 0.75];
    else if (ndwi < -0.1) return [0.86, 0.86, 0.86];
    else if (ndwi < 0) return [0.92, 0.92, 0.92];
    else if (ndwi < 0.025) return [0.8, 1, 1];
    else if (ndwi < 0.05) return [0.6, 0.9, 1];
    else if (ndwi < 0.075) return [0.4, 0.8, 1];
    else if (ndwi < 0.1) return [0.2, 0.7, 1];
    else return [0, 0.5, 1];
  }
`;

  const requestBody = {
    input: {
      bounds: { properties: { crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84" }, bbox },
      data: [{ type: "sentinel-2-l2a", dataFilter: { timeRange } }]
    },
    output: {
      width,
      height,
      responses: [{ identifier: "default", format: { type: "image/jpeg", quality: 80 } }]
    },
    evalscript
  };

  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Accept: 'image/jpeg'
      },
      responseType: 'arraybuffer'
    });

    console.log('NDWI image fetched successfully from Sentinel API');
    return response.data;
  } catch (error) {
    console.error('Error fetching NDWI image from Sentinel API:', error.message);
    throw new Error('NDWI image fetching failed.');
  }
};

module.exports = { fetchNdwiImage };
