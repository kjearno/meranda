const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const db = {};

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: true,
  },
});

// Test Database connection
if (process.env.NODE_ENV === "development") {
  sequelize
    .authenticate()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("Connection has been established successfully");
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Unable to connect to the database:", err);
    });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
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
