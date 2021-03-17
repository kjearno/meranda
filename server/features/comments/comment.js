module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
      underscored: true,
      defaultScope: {
        include: ["post", "user"],
      },
    }
  );

  // associations
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, { as: "post" });
    Comment.belongsTo(models.User, { as: "user" });
  };

  return Comment;
};
