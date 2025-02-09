const axios = require('axios');

const clientId = process.env.SENTINEL_CLIENT_ID || 'sh-7f3c436b-ad28-4499-9aa7-ef0b24137878';
const clientSecret = process.env.SENTINEL_CLIENT_SECRET || 'R19m2axvdKB8povlYdwB8c2c5oE3JVP4';
const tokenUrl = 'https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token';

const getAccessToken = async () => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await axios.post(tokenUrl, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Sentinel access token:', error.message);
    throw new Error('Failed to get Sentinel access token.');
  }
};

module.exports = { getAccessToken };
