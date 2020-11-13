const { Subscriber } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { getOptions } = require('../utils/sequelizeQuery');

// CRUD
exports.getSubscriber = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subscriber = await Subscriber.findByPk(id);

  if (!subscriber) {
    throw new AppError(`Subscriber with id "${id}" not found`, 404);
  }

  res.status(200).json(subscriber);
});

exports.getSubscribers = catchAsync(async (req, res, next) => {
  const options = getOptions(req.query);

  const subscribers = await Subscriber.findAll(options);
  const count = await Subscriber.count({ where: options.count });

  res.status(200).json({
    count,
    rows: subscribers
  });
});

exports.createSubscriber = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const subscriber = await Subscriber.create({ email });

  res.status(201).json(subscriber);
});

exports.updateSubscriber = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subscriber = await Subscriber.findByPk(id);

  if (!subscriber) {
    throw new AppError(`Subscriber with id "${id}" not found`, 404);
  }

  const { email } = req.body;

  await subscriber.update({
    email
  });

  res.status(200).json(subscriber);
});

exports.deleteSubscriber = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const subscriber = await Subscriber.findByPk(id);

  if (!subscriber) {
    throw new AppError(`Subscriber with id "${id}" not found`, 404);
  }

  await subscriber.destroy();

  res.status(204).json();
});

exports.deleteSubscribers = catchAsync(async (req, res, next) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      'Enter user "ids" in query parameters. Example: /users?ids=[1,2]',
      400
    );
  }

  await Subscriber.destroy({
    where: {
      id: JSON.parse(ids)
    }
  });

  res.status(204).json();
});
