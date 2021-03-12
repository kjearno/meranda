const sharp = require("sharp");
const { AppError } = require("@lib/errors");
const { handlePhoto } = require("@lib/photoHandler");
const { User, parseQuery } = require("@lib/sequelize");

exports.getUsers = async (req, res) => {
  const options = parseQuery(req);

  const users = await User.findAll(options);
  const count = await User.count({ where: options.where });

  res.status(200).json({
    count,
    rows: users,
  });
};

exports.createUser = async (req, res) => {
  const { email, password, username, photo } = req.body;

  const user = await User.create({
    email,
    password,
    username,
    photo,
  });

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

  const {
    email,
    password,
    username,
    photo,
    isActive,
    isAdmin,
    roleId,
  } = req.body;

  await user.update({
    email,
    password,
    username,
    photo,
    isActive,
    isAdmin,
    roleId,
  });

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
    throw new AppError(400, "Fill in all the fields");
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

exports.handlePhoto = () => {
  const handleUserPhoto = async (req, res, next) => {
    if (req.body.photo) {
      req.body.photo = null;
      return next();
    }

    if (!req.file) {
      req.body.photo = undefined;
      return next();
    }

    const file = req.file.buffer;
    const photoName = `/uploads/users/photos/${Date.now()}.jpg`;

    await sharp(file)
      .resize(300, 300)
      .toFormat("jpg")
      .toFile(`public${photoName}`);

    req.body.photo = process.env.BASE_URL + photoName;

    next();
  };

  return [handlePhoto, handleUserPhoto];
};
