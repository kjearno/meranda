const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Post title cannot be an empty string",
          },
          notNull: {
            msg: "Enter a title for the post",
          },
        },
      },
      slug: DataTypes.STRING,
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Enter the text of the post",
          },
          minLength(text) {
            if (text.length < 300) {
              throw new Error("Post must contain at least 300 characters");
            }
          },
        },
      },
      description: DataTypes.STRING,
      photo: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      isAttached: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "posts",
      underscored: true,
    }
  );

  SequelizeSlugify.slugifyModel(Post, {
    source: ["title"],
  });

  // associations
  Post.associate = (models) => {
    Post.belongsTo(models.Category, { as: "category" });
    Post.belongsTo(models.User, { as: "user" });
    Post.hasMany(models.Comment, { as: "comments", foreignKey: "postId" });
  };

  // hooks
  Post.beforeSave((post) => {
    if (post.changed("text")) {
      const { text } = post;
      post.description = `${text.slice(0, 160).trim()}...`;
    }

    if (post.changed("photo") && !post.photo) {
      post.thumbnail = null;
    }

    if (post.changed("photo") && post.photo) {
      const { photo } = post;
      post.thumbnail = `${photo.slice(0, -4)}-mini${photo.slice(-4)}`;
    }
  });

  return Post;
};
