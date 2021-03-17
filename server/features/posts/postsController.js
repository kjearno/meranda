const { AppError } = require("@lib/errors");
const { handlePhoto } = require("@lib/handlers");
const { Post, parseQuery } = require("@lib/sequelize");

exports.getPosts = async (req, res) => {
  const result = await Post.findAndCountAll({
    ...parseQuery(req),
  });

  res.status(200).json(result);
};

exports.createPost = async (req, res) => {
  const post = await Post.create(req.body);

  res.status(201).json(post);
};

exports.deletePosts = async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      400,
      "Enter post 'ids' in query parameters. Example: /posts?ids=[1,2]"
    );
  }

  await Post.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
};

exports.getPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);

  if (!post) {
    throw new AppError(404, `Post with id ${id} not found`);
  }

  res.status(200).json(post);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);

  if (!post) {
    throw new AppError(404, `Post with id ${id} not found`);
  }

  await post.update(req.body);

  res.status(200).json(post);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);

  if (!post) {
    throw new AppError(404, `Post with id ${id} not found`);
  }

  await post.destroy();

  res.status(204).json();
};

// additional
exports.handlePhoto = handlePhoto({ width: 600, height: 350 });
