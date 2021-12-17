import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Field } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";

export function PasswordField({ name, label, touched, errors }) {
  let errorMessage = "";
  const hasError = Boolean(touched[name] && errors[name]);
  errorMessage = hasError ? errors[name] : "";

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const endAdornment = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          tabIndex="-1"
          aria-label="toggle password visibility"
          onClick={toggleShowPassword}
          onMouseDown={(event) => event.preventDefault()}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    ),
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
    />
  );
}

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};
