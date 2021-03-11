const AppError = require('../utils/AppError');

const handleSequelizeDatabaseError = err => new AppError(err.message, 400);

const handleSequelizeValidationError = err => {
  const errors = err.errors.map(el => el.message);
  const message = `Validation error: ${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired. Please log in again', 401);
};

const sendErrorDev = (err, res) => {
  if (!err.error.isOperational) {
    // eslint-disable-next-line no-console
    console.log(err.stack);

    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err.error
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

module.exports = (err, req, res, next) => {
  let errObj = {
    statusCode: err.statusCode || 500,
    status: err.status || 'error',
    message: err.message || 'Unexpected error',
    stack: err.stack,
    error: err
  };

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(errObj, res);
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    switch (err.name) {
      case 'SequelizeDatabaseError':
        errObj = handleSequelizeDatabaseError(err);
        break;
      case 'SequelizeUniqueConstraintError':
      case 'SequelizeValidationError':
        errObj = handleSequelizeValidationError(err);
        break;
      case 'JsonWebTokenError':
        errObj = handleJWTError();
        break;
      case 'TokenExpiredError':
        errObj = handleJWTExpiredError();
        break;
      default:
        break;
    }

    sendErrorProd(errObj, res);
  }
};
