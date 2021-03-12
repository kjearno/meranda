module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role name cannot be an empty string",
          },
          notNull: {
            msg: "Enter a role name",
          },
        },
      },
    },
    {
      tableName: "roles",
      underscored: true,
    }
  );

  return Role;
};
