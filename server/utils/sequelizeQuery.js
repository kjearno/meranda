const AppError = require('./AppError');

const sort = query => {
  const sortField = query.sort || 'id';
  const sortBy = query.sortBy || 'DESC';

  return [[sortField, sortBy]];
};

const paginate = query => {
  const page = query.page || 1;
  const limit = query.limit || 10;

  if (limit > 100) {
    throw new AppError('Query parameter "limit" cannot be more than 100', 400);
  }

  const offset = (page - 1) * limit;

  return {
    limit,
    offset
  };
};

exports.getOptions = query => {
  const queryCopy = { ...query };
  const excludedFields = ['sort', 'sortBy', 'page', 'limit'];
  excludedFields.forEach(field => delete queryCopy[field]);

  if (queryCopy.id) {
    queryCopy.id = JSON.parse(queryCopy.id);
  }

  return {
    where: queryCopy,
    order: sort(query),
    limit: paginate(query).limit,
    offset: paginate(query).offset
  };
};
