const sharp = require("sharp");
const { AppError } = require("@lib/errors");
const { handlePhoto } = require("@lib/photoHandler");
const { Post, Category, Comment, User, parseQuery } = require("@lib/sequelize");

exports.getPosts = async (req, res) => {
  const options = parseQuery(req);

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
};

exports.createPost = async (req, res) => {
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
  const post = await Post.findByPk(id, {
    include: [{ model: User, as: "user" }],
  });

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

  const { title, text, photo, isAttached, categoryId } = req.body;

  await post.update({
    title,
    text,
    photo,
    isAttached,
    categoryId,
  });

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
