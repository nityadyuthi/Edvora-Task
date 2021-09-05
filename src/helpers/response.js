const StatusCodes = require('http-status-codes');

exports.successResponse = (res) => res.status(StatusCodes.OK).json();

exports.successResponseWithData = (res, data) => res.status(StatusCodes.OK).json(data);

exports.createdResponse = (res, data) => res.status(StatusCodes.CREATED).json(data);

exports.createdResponseWithData = (res, data) => res.status(StatusCodes.CREATED).json(data);

exports.errorResponse = (res, error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  .json({ error, message: error.message });

exports.notFoundResponse = (res, error) => res.status(StatusCodes.NOT_FOUND).json({
  error, message: error.message,
});

exports.validationErrorResponse = (res, error) => res.status(StatusCodes.BAD_REQUEST)
  .json({ error, message: error.message });

exports.unauthorizedResponse = (res, error) => res.status(StatusCodes.UNAUTHORIZED)
  .json({ error, message: error.message });

exports.forbiddenResponse = (res, error) => res.status(StatusCodes.FORBIDDEN)
  .json({ error, message: error.message });
