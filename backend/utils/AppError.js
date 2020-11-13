class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.status = 'fail';
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
