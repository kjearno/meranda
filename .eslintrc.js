module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@assets", "./src/assets"],
          ["@components", "./src/components"],
          ["@features", "./src/features"],
          ["@shared", "./src/shared"],
          ["@styles", "./src/styles"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
    react: {
      version: "detect",
    },
  },
};
