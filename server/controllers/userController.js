const sharp = require("sharp");
const { User } = require("../models");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { getOptions } = require("../utils/sequelizeQuery");
const { handlePhoto } = require("../utils/photoHandler");

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

// CRUD
exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError(`User with id ${id} not found`, 404);
  }

  res.status(200).json(user);
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const options = getOptions(req.query);

  const users = await User.findAll(options);
  const count = await User.count({ where: options.where });

  res.status(200).json({
    count,
    rows: users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, password, username, photo } = req.body;

  const user = await User.create({
    email,
    password,
    username,
    photo,
  });

  res.status(201).json(user);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError(`User with id ${id} not found`, 404);
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
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError(`User with id ${id} not found`, 404);
  }

  await user.destroy();

  res.status(204).json();
});

exports.deleteUsers = catchAsync(async (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      'Enter user "ids" in query parameters. Example: /users?ids=[1,2]',
      400
    );
  }

  await User.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
});

// Additional
exports.updateUserPhoto = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { photo } = req.body;

  await user.update({
    photo,
  });

  res.status(200).json(user);
});

exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError("Fill in all the fields", 400);
  }

  const isValidPassword = await user.comparePassword(
    currentPassword,
    user.password
  );

  if (!isValidPassword) {
    throw new AppError("The current password is invalid", 400);
  }

  await user.update({ password: newPassword });

  res.status(200).json(user);
});
