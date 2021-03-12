const { AppError } = require("@lib/errors");
const { Category, Comment, Post, User, parseQuery } = require("@lib/sequelize");

exports.getCategories = async (req, res) => {
  const options = parseQuery(req);

  const categories = await Category.findAll(options);
  const count = await Category.count({ where: options.where });

  res.status(200).json({
    count,
    rows: categories,
  });
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({
    name,
  });

  res.status(201).json(category);
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      400,
      'Enter category "ids" in query parameters. Example: /categories?ids=[1,2]'
    );
  }

  await Category.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError(404, `Category with id ${id} not found`);
  }

  res.status(200).json(category);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError(404, `Category with id ${id} not found`);
  }

  const { name } = req.body;
  await category.update({
    name,
  });

  res.status(200).json(category);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError(404, `Category with id ${id} not found`);
  }

  await category.destroy();

  res.status(204).json();
};

// additional
exports.getPostFromCategory = async (req, res) => {
  const { category: categorySlug, post: postSlug } = req.params;

  const category = await Category.findOne({
    where: {
      slug: categorySlug,
    },
    include: [
      {
        model: Post,
        as: "posts",
        where: {
          slug: postSlug,
        },
        include: [
          { model: Category, as: "category" },
          {
            model: Comment,
            as: "comments",
            include: [{ model: User, as: "user" }],
          },
          { model: User, as: "user" },
        ],
      },
    ],
  });

  const post = category && category.get("posts")[0];

  if (!post) {
    throw new AppError(
      404,
      `Post for "/categories/${categorySlug}/posts/${postSlug}" not found`
    );
  }

  res.status(200).json(post);
};

exports.getPostsFromCategory = async (req, res) => {
  const options = parseQuery(req);
  const { category: categorySlug } = req.params;

  const category = await Category.findOne({
    where: {
      slug: categorySlug,
    },
    include: [
      {
        model: Post,
        as: "posts",
        ...options,
        include: [
          { model: Category, as: "category" },
          { model: User, as: "user" },
        ],
      },
    ],
  });

  if (!category) {
    throw new AppError(404, `Category for "${categorySlug}" not found`);
  }

  const postsCount = await Post.count({
    where: {
      categoryId: category.id,
    },
  });

  category.set("postsCount", postsCount, { raw: true });

  res.status(200).json(category);
};
