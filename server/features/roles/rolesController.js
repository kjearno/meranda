const { AppError } = require("@lib/errors");
const { Role, parseQuery } = require("@lib/sequelize");

exports.getRoles = async (req, res) => {
  const result = await Role.findAndCountAll({
    ...parseQuery(req),
  });

  res.status(200).json(result);
};

exports.getRole = async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByPk(id);

  if (!role) {
    throw new AppError(404, `Role with id ${id} not found`);
  }

  res.status(200).json(role);
};
