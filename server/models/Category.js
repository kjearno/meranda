const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category name cannot be an empty string",
          },
          notNull: {
            msg: "Enter a category name",
          },
        },
      },
      slug: DataTypes.STRING,
    },
    {
      tableName: "categories",
      underscored: true,
    }
  );

  SequelizeSlugify.slugifyModel(Category, {
    source: ["name"],
  });

  // Associations
  Category.associate = (models) => {
    Category.hasMany(models.Post, { as: "posts", foreignKey: "categoryId" });
  };

  return Category;
};
