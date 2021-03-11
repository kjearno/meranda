import React, { useState } from "react";
import { Field } from "formik";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export const PasswordField = ({ name, label, touched, errors, ...props }) => {
  let errorMessage = "";
  const hasError = Boolean(touched[name] && errors[name]);
  errorMessage = hasError ? errors[name] : "";

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevValue => !prevValue);
  };

  const endAdornment = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          tabIndex="-1"
          aria-label="toggle password visibility"
          onClick={toggleShowPassword}
          onMouseDown={event => event.preventDefault()}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    )
  };

  return (
    <Field
      as={TextField}
      autoComplete="off"
      error={hasError}
      fullWidth
      helperText={errorMessage}
      InputProps={endAdornment}
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      {...props}
    />
  );
};
