import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { TextField as MuiTextField } from "@material-ui/core";

export function TextField({ name, label, touched, errors }) {
  let errorMessage = "";
  const hasError = Boolean(touched[name] && errors[name]);
  errorMessage = hasError ? errors[name] : "";

  return (
    <Field
      as={MuiTextField}
      autoComplete="off"
      error={hasError}
      fullWidth
      helperText={errorMessage}
      label={label}
      name={name}
      type="text"
    />
  );
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};
