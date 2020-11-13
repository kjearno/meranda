const { Role } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { getOptions } = require('../utils/sequelizeQuery');

exports.getRoles = catchAsync(async (req, res, next) => {
  const options = getOptions(req.query);

  const roles = await Role.findAll(options);
  const count = await Role.count({ where: options.where });

  res.status(200).json({
    count,
    rows: roles
  });
});
