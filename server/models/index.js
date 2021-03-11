/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../lib/sequelize/db/config")[env];

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

if (env === "development") {
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  testConnection();
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
