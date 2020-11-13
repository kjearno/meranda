import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import styles from "./FormButton.module.scss";

export const FormButton = ({
  color = "primary",
  loading = false,
  type = "submit",
  variant = "contained",
  disabled,
  children,
  ...props
}) => (
  <Button
    className={styles.button}
    color={color}
    variant={variant}
    type={type}
    disabled={disabled || loading}
    {...props}
  >
    {children}
    {loading && <CircularProgress className={styles.progress} size={24} />}
  </Button>
);
