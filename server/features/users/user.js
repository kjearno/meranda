const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          minLength(password) {
            if (password.length < 8) {
              throw new Error("Password must be at least 8 characters");
            }
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          minLength(username) {
            if (username.length < 3) {
              throw new Error("Username must be at least 3 characters");
            }
          },
        },
      },
      photo: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
    },
    {
      tableName: "users",
      underscored: true,
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
        include: ["role"],
      },
    }
  );

  // associations
  User.associate = (models) => {
    User.belongsTo(models.Role, { as: "role" });
  };

  // hooks
  User.beforeSave(async (user) => {
    if (user.changed("email")) {
      user.email = user.email.toLowerCase();
    }

    if (user.changed("password")) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }
  });

  // instance methods
  User.prototype.comparePassword = async (plainPassword, hashedPassword) =>
    bcrypt.compare(plainPassword, hashedPassword);

  return User;
};
