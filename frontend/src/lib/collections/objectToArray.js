import _ from "lodash-es";

export const objectToArray = object => {
  return _.chain(object)
    .values()
    .orderBy(["id"], ["desc"])
    .value();
};
