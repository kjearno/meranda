const { Comment, Category, Post, User } = require("../models");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { getOptions } = require("../utils/sequelizeQuery");

// CRUD
exports.getComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id, {
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  });

  if (!comment) {
    throw new AppError(`Comment with id ${id} not found`, 404);
  }

  res.status(200).json(comment);
});

exports.getComments = catchAsync(async (req, res, next) => {
  const options = getOptions(req.query);

  const comments = await Comment.findAll({
    ...options,
    include: [
      {
        model: Post,
        as: "post",
        include: [{ model: Category, as: "category" }],
      },
      {
        model: User,
        as: "user",
      },
    ],
  });
  const count = await Comment.count({ where: options.where });

  res.status(200).json({
    count,
    rows: comments,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const commentData = {
    text: req.body.text,
    postId: req.body.postId,
    userId: req.user.id,
  };

  const comment = await Comment.create(commentData);

  res.status(201).json(comment);
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new AppError(`Comment with id ${id} not found`, 404);
  }

  const { text } = req.body;
  await comment.update({
    text,
  });

  res.status(200).json(comment);
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new AppError(`Comment with id ${id} not found`, 404);
  }

  await comment.destroy();

  res.status(204).json();
});

exports.deleteComments = catchAsync(async (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      'Enter comment "ids" in query parameters. Example: /comments?ids=[1,2]',
      400
    );
  }

  await Comment.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
});

// Additional
exports.sendComment = catchAsync(async (req, res, next) => {
  const commentData = {
    text: req.body.text,
    postId: req.body.postId,
    userId: req.user.id,
  };

  const createdComment = await Comment.create(commentData);

  const comment = await Comment.findOne({
    where: {
      id: createdComment.id,
    },
    include: [
      { model: User, as: "user" },
      {
        model: Post,
        as: "post",
        include: [{ model: Category, as: "category" }],
      },
    ],
  });

  res.status(201).json(comment);
});
