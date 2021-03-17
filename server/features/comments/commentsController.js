const { AppError } = require("@lib/errors");
const { Comment, parseQuery } = require("@lib/sequelize");

exports.getComments = async (req, res) => {
  const result = await Comment.findAndCountAll({
    ...parseQuery(req),
  });

  res.status(200).json(result);
};

exports.createComment = async (req, res) => {
  const comment = await Comment.create(req.body);

  res.status(201).json(comment);
};

exports.deleteComments = async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      400,
      "Enter comment 'ids' in query parameters. Example: /comments?ids=[1,2]"
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

  const comment = await Comment.findByPk(id);

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

  await comment.update(req.body);

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
  const data = {
    text: req.body.text,
    postId: req.body.postId,
    userId: req.user.id,
  };

  const comment = await Comment.create(data);

  const post = await comment.getPost();
  comment.setDataValue("post", post);

  const user = await comment.getUser();
  comment.setDataValue("user", user);

  res.status(201).json(comment);
};
