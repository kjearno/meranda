const { AppError } = require("@lib/errors");
const { Subscriber, parseQuery } = require("@lib/sequelize");

exports.getSubscribers = async (req, res) => {
  const options = parseQuery(req);

  const subscribers = await Subscriber.findAll(options);
  const count = await Subscriber.count({ where: options.count });

  res.status(200).json({
    count,
    rows: subscribers,
  });
};

exports.createSubscriber = async (req, res) => {
  const { email } = req.body;

  const subscriber = await Subscriber.create({ email });

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

  const { email } = req.body;

  await subscriber.update({
    email,
  });

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
