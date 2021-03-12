const { AppError } = require("@lib/errors");
const { Comment, Category, Post, User, parseQuery } = require("@lib/sequelize");

exports.getComments = async (req, res) => {
  const options = parseQuery(req);

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
};

exports.createComment = async (req, res) => {
  const commentData = {
    text: req.body.text,
    postId: req.body.postId,
    userId: req.user.id,
  };

  const comment = await Comment.create(commentData);

  res.status(201).json(comment);
};

exports.deleteComments = async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      400,
      'Enter comment "ids" in query parameters. Example: /comments?ids=[1,2]'
    );
  }

  await Comment.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
};

exports.getComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id, {
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  });

  if (!comment) {
    throw new AppError(404, `Comment with id ${id} not found`);
  }

  res.status(200).json(comment);
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new AppError(404, `Comment with id ${id} not found`);
  }

  const { text } = req.body;
  await comment.update({
    text,
  });

  res.status(200).json(comment);
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new AppError(404, `Comment with id ${id} not found`);
  }

  await comment.destroy();

  res.status(204).json();
};

// additional
exports.sendComment = async (req, res) => {
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
};
