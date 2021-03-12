const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Enter email in the correct format",
          },
          notNull: {
            msg: "Enter user email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Enter user password",
          },
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
          notEmpty: {
            msg: "Username cannot be an empty string",
          },
          notNull: {
            msg: "Enter username",
          },
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
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
    },
    {
      tableName: "users",
      underscored: true,
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
        include: [{ association: "role" }],
      },
    }
  );

  // associations
  User.associate = (models) => {
    User.belongsTo(models.Role, { as: "role" });
    User.hasMany(models.Comment, { as: "comments", foreignKey: "userId" });
  };

  // hooks
  User.beforeSave(async (user) => {
    if (user.changed("email")) {
      user.email = user.email.toLowerCase();
    }

    if (user.changed("password")) {
      const hash = await bcrypt.hash(user.password, 12);
      user.password = hash;
    }
  });

  // instance methods
  User.prototype.comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
  };

  return User;
};
