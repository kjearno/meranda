const { AppError } = require("@lib/errors");

const filter = (query) => {
  const queryCopy = { ...query };
  const excludedFields = ["sort", "sortBy", "limit", "page"];
  excludedFields.forEach((field) => delete queryCopy[field]);

  if (queryCopy.id) {
    queryCopy.id = JSON.parse(queryCopy.id);
  }

  return queryCopy;
};

const sort = ({ sort: sortField = "id", sortBy = "ASC" }) => [
  [sortField, sortBy],
];

const paginate = ({ limit = 10, page = 1 }) => {
  if (limit > 100) {
    throw new AppError(400, "Query parameter 'limit' cannot be more than 100");
  }

  return {
    limit,
    offset: (page - 1) * limit,
  };
};

const parseQuery = ({ query } = {}) => ({
  where: filter(query),
  order: sort(query),
  limit: paginate(query).limit,
  offset: paginate(query).offset,
});

module.exports = parseQuery;
