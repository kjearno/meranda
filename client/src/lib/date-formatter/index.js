import { format } from "date-fns";
import { cloneDeep } from "lodash-es";

// The function takes arrays and objects as an argument
export const formatDates = arg => {
  const props = ["createdAt"];

  function isPrimitive(test) {
    return test !== Object(test);
  }

  function iterate(arg) {
    const collection = Array.isArray(arg) ? arg : [arg];

    const resOfIteration = collection.map(item => {
      const keys = Object.keys(item);

      keys.forEach(key => {
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
  }

  const argCopy = cloneDeep(arg);
  return iterate(argCopy);
};
