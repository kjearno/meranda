const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      tableName: "categories",
      underscored: true,
    }
  );

  SequelizeSlugify.slugifyModel(Category, {
    source: ["name"],
  });

  return Category;
};
