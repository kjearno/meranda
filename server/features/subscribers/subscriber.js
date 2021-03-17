module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define(
    "Subscriber",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
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
