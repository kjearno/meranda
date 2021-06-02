const logErrorStack = (error) => {
  if (error.name !== "AppError") {
    console.error(error.stack);
  }
};

module.exports = logErrorStack;
