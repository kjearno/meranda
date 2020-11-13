import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "antd";
import _ from "lodash-es";

import { history } from "@lib/routing";
import { getRelations } from "../../../lib/relations";
import {
  resourcesOperations,
  resourcesSelectors
} from "../../../modules/resources";
import { getInputs } from "./inputs";

export const useResourceEdit = () => {
  const dispatch = useDispatch();

  const [touchedValues, setTouchedValues] = useState({});
  const isValuesTouched = !!Object.keys(touchedValues).length;

  const { resource: resourceName, id } = useParams();

  const { error, editing, relations } = useSelector(
    resourcesSelectors.everything
  );
  const { loading } = useSelector(resourcesSelectors.resource);
  const item = useSelector(resourcesSelectors.item);

  const [form] = Form.useForm();

  const inputs = getInputs({ relations });

  useEffect(() => {
    const isResourceExist = inputs[resourceName];

    if (isResourceExist) {
      dispatch(resourcesOperations.fetchItem(resourceName, id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, resourceName, id, item]);

  useEffect(() => {
    const { id: isFieldsSetted } = form.getFieldsValue();

    if (!isFieldsSetted) {
      form.setFieldsValue(item);
      return;
    }

    const relations = _.keys(item).filter(key => key.endsWith("Id"));
    const values = _.omit(item, relations);

    form.setFieldsValue(values);
  }, [form, item]);

  useEffect(() => {
    const relationNames = getRelations(inputs[resourceName]);
    dispatch(resourcesOperations.fetchRelations(relationNames));
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

  const handleEdit = async () => {
    const formData = new FormData();

    for (const key in touchedValues) {
      formData.append(key, touchedValues[key]);
    }

    dispatch(resourcesOperations.editItem({ formData, setTouchedValues }));
  };

  return {
    error,
    loading,
    editing,
    inputs: inputs[resourceName],
    form,
    isValuesTouched,
    onValuesChange: handleValuesChange,
    onEdit: handleEdit
  };
};
