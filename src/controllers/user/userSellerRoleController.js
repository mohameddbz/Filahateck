const { successResponse } = require('./../../utils/response');
const { errorResponse } = require('./../../utils/error');

const { get } = require('../../auth/authRoutes');
const {getSellerRoleOfUser} = require('../../services/user/userSellerRoleService');


const getSellerRoleOfUserByID = async (req, res) => {
    try {
      const userSellerRole = await getSellerRoleOfUser(req.params.id);
      if (!userSellerRole) {
        return errorResponse(res, 404, 'User not found');
      }
      return successResponse(res, 200, 'User retrieved successfully', userSellerRole);
    } catch (error) {
      return errorResponse(res, 500, 'Failed to fetch user', error.message);
    }
  }


  module.exports = {
    getSellerRoleOfUserByID
  };