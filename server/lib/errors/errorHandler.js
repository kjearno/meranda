const errorHandler = (err, req, res, next) => {
  let { statusCode = 500 } = err;
  const { message = "Unexpected error" } = err;

  switch (err.name) {
    case "SequelizeDatabaseError":
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      statusCode = 400;
      break;
    case "JsonWebTokenError":
    case "TokenExpiredError":
      statusCode = 401;
      break;
    default:
      break;
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
