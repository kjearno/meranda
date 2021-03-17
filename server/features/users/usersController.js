const { AppError } = require("@lib/errors");
const { handlePhoto } = require("@lib/handlers");
const { User, parseQuery } = require("@lib/sequelize");

exports.getUsers = async (req, res) => {
  const result = await User.findAndCountAll({
    ...parseQuery(req),
  });

  res.status(200).json(result);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json(user);
};

exports.deleteUsers = async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      400,
      "Enter user 'ids' in query parameters. Example: /users?ids=[1,2]"
    );
  }

  await User.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError(404, `User with id ${id} not found`);
  }

  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError(404, `User with id ${id} not found`);
  }

  await user.update(req.body);

  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError(404, `User with id ${id} not found`);
  }

  await user.destroy();

  res.status(204).json();
};

// additional
exports.handlePhoto = handlePhoto({ width: 300, height: 300 });

exports.updateUserPhoto = async (req, res) => {
  const { user } = req;
  const { photo } = req.body;

  await user.update({
    photo,
  });

  res.status(200).json(user);
};

exports.updateUserPassword = async (req, res) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError(400, "Enter current and new password");
  }

  const isValidPassword = await user.comparePassword(
    currentPassword,
    user.password
  );

  if (!isValidPassword) {
    throw new AppError(400, "The current password is invalid");
  }

  await user.update({ password: newPassword });

  res.status(200).json(user);
};
