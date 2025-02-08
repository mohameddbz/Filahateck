import api from './api';

/**
 * General function to make API requests.
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} [data] - Data to send in the request body
 * @param {object} [params] - Query parameters
 * @returns {Promise} - Resolves with the API response
 */
export const makeRequest = async (endpoint, method = 'GET', data = {}, params = {}) => {
  try {

    const token = localStorage.getItem('Token'); 
    if (token) {
      params.token = token;
    }

    const response = await api({
      url: endpoint,
      method,
      data,
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', 
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
