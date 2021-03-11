import _ from "lodash-es";
import pluralize from "pluralize";

export const getRelations = inputs =>
  _.chain(inputs)
    .filter(item => _.endsWith(item.name, "Id"))
    .map("name")
    .uniq()
    .map(item => pluralize(item.slice(0, -2)))
    .value();
