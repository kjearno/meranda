const AppError = require("./AppError");

const logErrorStack = (error) => {
  if (error.name !== "AppError") {
    console.error(error.stack);
  }
};

const errorHandler = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "Unexpected error",
    stack: err.stack,
  };

  switch (err.name) {
    case "SequelizeDatabaseError":
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      error = new AppError(400, error.message);
      break;
    case "JsonWebTokenError":
    case "TokenExpiredError":
      error = new AppError(401, error.message);
      break;
    default:
      break;
  }

  if (process.env.NODE_ENV === "development") {
    logErrorStack(error);
  }

  res.status(error.statusCode).json({ message: error.message });
};

module.exports = errorHandler;
