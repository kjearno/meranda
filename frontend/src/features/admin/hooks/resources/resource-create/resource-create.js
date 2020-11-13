import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { history } from "@lib/routing";
import { getRelations } from "../../../lib/relations";
import {
  resourcesOperations,
  resourcesSelectors
} from "../../../modules/resources";
import { getInputs } from "./inputs";

export const useResourceCreate = () => {
  const dispatch = useDispatch();

  const [touchedValues, setTouchedValues] = useState({});
  const isValuesTouched = !!Object.keys(touchedValues).length;

  const { resource: resourceName } = useParams();

  const { creating, relations } = useSelector(resourcesSelectors.everything);

  const inputs = getInputs({ relations });

  useEffect(() => {
    const isCreatePage =
      history.location.pathname.split("/").slice(-1)[0] === "create";

    if (isCreatePage) {
      const relationNames = getRelations(inputs[resourceName]);
      dispatch(resourcesOperations.fetchRelations(relationNames));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, resourceName]);

  useEffect(() => {
    if (isValuesTouched) {
      const unblock = history.block(
        "Are you sure you want to leave this page?"
      );

      return () => {
        unblock();
      };
    }
  }, [isValuesTouched]);

  const handleValuesChange = value => {
    setTouchedValues({ ...touchedValues, ...value });
  };

  const handleCreate = values => {
    const formData = new FormData();

    for (const key in values) {
      if (typeof values[key] === "object") {
        formData.append(key, JSON.stringify(values[key]));
      }

      values[key] !== undefined && formData.append(key, values[key]);
    }

    dispatch(resourcesOperations.createItem({ formData, setTouchedValues }));
  };

  return {
    creating,
    inputs: inputs[resourceName],
    isValuesTouched,
    onValuesChange: handleValuesChange,
    onCreate: handleCreate
  };
};
