const AppError = require("../AppError");

const combineErrors = (error) => {
  const errors = error.errors.map((e) => e.message);
  const message = `Validation error: ${errors.join(", ")}`;
  return new AppError(400, message);
};

const handleErrorProd = (error) => {
  switch (error.name) {
    case "SequelizeDatabaseError":
      return new AppError(400, error.message);
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      return combineErrors(error);
    case "JsonWebTokenError":
    case "TokenExpiredError":
      return new AppError(401, error.message);
    default:
      return error;
  }
};

module.exports = handleErrorProd;
