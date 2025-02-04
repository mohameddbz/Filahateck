import api from './api';

/**
 * General function to make API requests.
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} [data] - Data to send in the request body
 * @param {object} [params] - Query parameters
 * @returns {Promise} - Resolves with the API response
 */
export const makeRequest = async (endpoint, method = 'GET', data = {}, config = {}) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
      ...config, // Merge headers and other configurations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
