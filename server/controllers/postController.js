const sharp = require("sharp");
const { Post, Category, Comment, User } = require("../models");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { getOptions } = require("../utils/sequelizeQuery");
const { handlePhoto } = require("../utils/photoHandler");

exports.handlePhoto = () => {
  const handlePostPhoto = async (req, res, next) => {
    if (req.body.photo) {
      req.body.photo = null;
      return next();
    }

    if (!req.file) {
      req.body.photo = undefined;
      return next();
    }

    const file = req.file.buffer;
    const photoName = `/uploads/posts/photos/${Date.now()}.jpg`;

    await sharp(file)
      .resize(600, 350)
      .toFormat("jpg")
      .toFile(`public${photoName}`);

    const thumbnailName = `${photoName.slice(0, -4)}-mini${photoName.slice(
      -4
    )}`;

    await sharp(file)
      .resize(500, 300)
      .toFormat("jpg")
      .toFile(`public${thumbnailName}`);

    req.body.photo = process.env.BASE_URL + photoName;

    next();
  };

  return [handlePhoto, handlePostPhoto];
};

// CRUD
exports.getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByPk(id, {
    include: [{ model: User, as: "user" }],
  });

  if (!post) {
    throw new AppError(`Post with id ${id} not found`, 404);
  }

  res.status(200).json(post);
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const options = getOptions(req.query);

  const posts = await Post.findAll({
    ...options,
    include: [
      { model: Category, as: "category" },
      {
        model: Comment,
        as: "comments",
        include: [{ model: User, as: "user" }],
      },
      { model: User, as: "user" },
    ],
  });
  const count = await Post.count({ where: options.where });

  res.status(200).json({
    count,
    rows: posts,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { title, text, photo, isAttached, categoryId } = req.body;

  const post = await Post.create({
    title,
    text,
    photo,
    isAttached,
    userId,
    categoryId,
  });

  res.status(201).json(post);
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) {
    throw new AppError(`Post with id ${id} not found`, 404);
  }

  const { title, text, photo, isAttached, categoryId } = req.body;

  await post.update({
    title,
    text,
    photo,
    isAttached,
    categoryId,
  });

  res.status(200).json(post);
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) {
    throw new AppError(`Post with id ${id} not found`, 404);
  }

  await post.destroy();

  res.status(204).json();
});

exports.deletePosts = catchAsync(async (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      'Enter post "ids" in query parameters. Example: /posts?ids=[1,2]',
      400
    );
  }

  await Post.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
});
