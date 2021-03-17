const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
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
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          minLength(text) {
            if (text.length < 300) {
              throw new Error("Post must contain at least 300 characters");
            }
          },
        },
      },
      description: DataTypes.STRING,
      photo: DataTypes.STRING,
      isAttached: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "posts",
      underscored: true,
      defaultScope: {
        include: ["category", "user"],
      },
    }
  );

  SequelizeSlugify.slugifyModel(Post, {
    source: ["title"],
  });

  // associations
  Post.associate = (models) => {
    Post.belongsTo(models.Category, { as: "category" });
    Post.belongsTo(models.User, { as: "user" });
  };

  // hooks
  Post.beforeSave((post) => {
    if (post.changed("text")) {
      const { text } = post;
      post.description = `${text.slice(0, 160).trim()}...`;
    }
  });

  return Post;
};
