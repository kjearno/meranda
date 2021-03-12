const { Role, parseQuery } = require("@lib/sequelize");

exports.getRoles = async (req, res) => {
  const options = parseQuery(req);

  const roles = await Role.findAll(options);
  const count = await Role.count({ where: options.where });

  res.status(200).json({
    count,
    rows: roles,
  });
};
