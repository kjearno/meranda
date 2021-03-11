module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define(
    "Subscriber",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Enter email in the correct format",
          },
          notNull: {
            msg: "Enter email",
          },
        },
      },
    },
    {
      tableName: "subscribers",
      underscored: true,
    }
  );

  return Subscriber;
};
