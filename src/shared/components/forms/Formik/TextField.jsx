import { TextField as MuiTextField } from "@material-ui/core";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";

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
