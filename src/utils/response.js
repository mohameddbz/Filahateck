// Success Response Utility
const successResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status: 'success',
        message: message,
        data: data,
    });
};

module.exports = { successResponse };
