const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@features": path.resolve(__dirname, "src/features"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
};
