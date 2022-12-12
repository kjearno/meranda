import { format } from "date-fns";
import { cloneDeep } from "lodash-es";

const isPrimitive = (test) => test !== Object(test);

const iterate = (arg) => {
  const props = ["createdAt"];
  const collection = Array.isArray(arg) ? arg : [arg];

  const resOfIteration = collection.map((item) => {
    const keys = Object.keys(item);

    keys.forEach((key) => {
      if (props.includes(key) && isPrimitive(item[key])) {
        item[key] = format(new Date(item[key]), "dd MMM, HH:mm");
        return;
      }

      if (!isPrimitive(item[key])) {
        iterate(item[key]);
      }
    });

    return item;
  });

  return Array.isArray(arg) ? resOfIteration : { ...resOfIteration[0] };
};

export const formatDates = (arg) => {
  const argCopy = cloneDeep(arg);

  return iterate(argCopy);
};
