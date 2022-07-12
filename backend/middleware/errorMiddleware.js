const dotenv = require('../config/env_config');

const defaultErrorHandler = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500;
  res.status(statusCode);
  res.send({
    status: statusCode,
    message: err.message,
    stack: dotenv.NODE_ENV === 'production' ? null : err.stack,
  });
};

const mongoDbErrorHandler = (error) => {
  if (error.code === 11000) {
    const error = new Error('Duplicate data found on database !!!');
    error.status = 400;
    throw error;
  } else if (error.name === 'CastError') {
    const error = new Error('Invalid product ID for database !!!');
    error.status = 400;
    throw error;
  } else if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((el) => el.message);
    const validationError = new Error(
      `Invalid input data ${errors.join(', ')}`
    );
    validationError.status = 400;
    throw validationError;
  } else {
    throw error;
  }
};

const notFoundErrorHandler = (reqId) => {
  const error = new Error(`Selected ID: ${reqId} not found on Database !!!`);
  error.status = 404;
  throw error;
};

const invalidUserErrorHandler = () => {
  const error = new Error(`Invalid User Credentials !!!`);
  error.status = 401;
  throw error;
};

module.exports = {
  defaultErrorHandler,
  mongoDbErrorHandler,
  notFoundErrorHandler,
  invalidUserErrorHandler,
};
