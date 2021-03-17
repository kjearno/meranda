const { AppError } = require("@lib/errors");
const { Subscriber, parseQuery } = require("@lib/sequelize");

exports.getSubscribers = async (req, res) => {
  const result = await Subscriber.findAndCountAll({
    ...parseQuery(req),
  });

  res.status(200).json(result);
};

exports.createSubscriber = async (req, res) => {
  const subscriber = await Subscriber.create(req.body);

  res.status(201).json(subscriber);
};

exports.deleteSubscribers = async (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    throw new AppError(
      400,
      "Enter user 'ids' in query parameters. Example: /users?ids=[1,2]"
    );
  }

  await Subscriber.destroy({
    where: {
      id: JSON.parse(ids),
    },
  });

  res.status(204).json();
};

exports.getSubscriber = async (req, res) => {
  const { id } = req.params;

  const subscriber = await Subscriber.findByPk(id);

  if (!subscriber) {
    throw new AppError(404, `Subscriber with id ${id} not found`);
  }

  res.status(200).json(subscriber);
};

exports.updateSubscriber = async (req, res) => {
  const { id } = req.params;

  const subscriber = await Subscriber.findByPk(id);

  if (!subscriber) {
    throw new AppError(404, `Subscriber with id ${id} not found`);
  }

  await subscriber.update(req.body);

  res.status(200).json(subscriber);
};

exports.deleteSubscriber = async (req, res) => {
  const { id } = req.params;

  const subscriber = await Subscriber.findByPk(id);

  if (!subscriber) {
    throw new AppError(404, `Subscriber with id ${id} not found`);
  }

  await subscriber.destroy();

  res.status(204).json();
};
