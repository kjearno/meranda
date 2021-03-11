const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@features": path.join(path.resolve(__dirname, "./src/features")),
      "@lib": path.join(path.resolve(__dirname, "./src/lib")),
      "@pages": path.join(path.resolve(__dirname, "./src/pages")),
      "@ui": path.join(path.resolve(__dirname, "./src/ui")),
      "@src": path.join(path.resolve(__dirname, "./src"))
    }
  }
};
