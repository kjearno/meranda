const { Category, Comment, Post, User } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { getOptions } = require('../utils/sequelizeQuery');

// CRUD
exports.getCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError(`Category with id ${id} not found`, 404);
  }

  res.status(200).json(category);
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const options = getOptions(req.query);

  const categories = await Category.findAll(options);
  const count = await Category.count({ where: options.where });

  res.status(200).json({
    count,
    rows: categories
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({
    name
  });

  res.status(201).json(category);
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError(`Category with id ${id} not found`, 404);
  }

  const { name } = req.body;
  await category.update({
    name
  });

  res.status(200).json(category);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);

  if (!category) {
    throw new AppError(`Category with id ${id} not found`, 404);
  }

  await category.destroy();

  res.status(204).json();
});

exports.deleteCategories = catchAsync(async (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      'Enter category "ids" in query parameters. Example: /categories?ids=[1,2]',
      400
    );
  }

  await Category.destroy({
    where: {
      id: JSON.parse(ids)
    }
  });

  res.status(204).json();
});

// Additional
exports.getPostFromCategory = catchAsync(async (req, res, next) => {
  const { category: categorySlug, post: postSlug } = req.params;

  const category = await Category.findOne({
    where: {
      slug: categorySlug
    },
    include: [
      {
        model: Post,
        as: 'posts',
        where: {
          slug: postSlug
        },
        include: [
          { model: Category, as: 'category' },
          {
            model: Comment,
            as: 'comments',
            include: [{ model: User, as: 'user' }]
          },
          { model: User, as: 'user' }
        ]
      }
    ]
  });

  const post = category && category.get('posts')[0];

  if (!post) {
    throw new AppError(
      `Post for "/categories/${categorySlug}/posts/${postSlug}" not found`,
      404
    );
  }

  res.status(200).json(post);
});

exports.getPostsFromCategory = catchAsync(async (req, res, next) => {
  const options = getOptions(req.query);
  const { category: categorySlug } = req.params;

  const category = await Category.findOne({
    where: {
      slug: categorySlug
    },
    include: [
      {
        model: Post,
        as: 'posts',
        ...options,
        include: [
          { model: Category, as: 'category' },
          { model: User, as: 'user' }
        ]
      }
    ]
  });

  if (!category) {
    throw new AppError(`Category for "${categorySlug}" not found`, 404);
  }

  const postsCount = await Post.count({
    where: {
      categoryId: category.id
    }
  });

  category.set('postsCount', postsCount, { raw: true });

  res.status(200).json(category);
});
