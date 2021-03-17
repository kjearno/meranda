const { AppError } = require("@lib/errors");
const { Category, parseQuery } = require("@lib/sequelize");

exports.getCategories = async (req, res) => {
  const result = await Category.findAndCountAll({
    ...parseQuery(req),
  });

  res.status(200).json(result);
};

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json(category);
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      400,
      "Enter category 'ids' in query parameters. Example: /categories?ids=[1,2]"
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

  await category.update(req.body);

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
