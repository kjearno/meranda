module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Comment text cannot be an empty string",
          },
          notNull: {
            msg: "Enter your comment text",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
      underscored: true,
    }
  );

  // Associations
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, { as: "post" });
    Comment.belongsTo(models.User, { as: "user" });
  };

  return Comment;
};
