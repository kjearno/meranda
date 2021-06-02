const handleErrorProd = require("./handleErrorProd");
const logErrorStack = require("./logErrorStack");

const errorHandler = (err, req, res, next) => {
  let error = {
    name: err.name,
    errors: err.errors,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    message: err.message || "Unexpected error",
  };

  if (process.env.NODE_ENV === "development") {
    logErrorStack(error);
  }

  if (process.env.NODE_ENV === "production") {
    error = handleErrorProd(error);
  }

  res.status(error.statusCode).json({ message: error.message });
};

module.exports = errorHandler;
