import React from "react";
import { Field } from "formik";

import { TextField as MuiTextField } from "@material-ui/core";

export const TextField = ({ name, label, touched, errors, autoFocus }) => {
  let errorMessage = "";
  const hasError = Boolean(touched[name] && errors[name]);
  errorMessage = hasError ? errors[name] : "";

  return (
    <Field
      as={MuiTextField}
      autoComplete="off"
      autoFocus={autoFocus}
      error={hasError}
      fullWidth
      helperText={errorMessage}
      label={label}
      name={name}
      type="text"
    />
  );
};
