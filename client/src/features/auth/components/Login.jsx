import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormButton,
  FormGroup,
  Paper,
  PasswordField,
  TextField,
} from "@shared/components";
import { useAuth } from "../hooks";

export function Login() {
  const { isLoading, onLogin } = useAuth();

  return (
    <Paper>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().required("Fill in this field"),
          password: Yup.string().required("Fill in this field"),
        })}
        validateOnBlur={false}
        onSubmit={onLogin}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form>
            <FormGroup>
              <TextField
                name="username"
                label="Username"
                touched={touched}
                errors={errors}
              />
            </FormGroup>

            <FormGroup>
              <PasswordField
                name="password"
                label="Password"
                touched={touched}
                errors={errors}
              />
            </FormGroup>

            <FormButton disabled={!dirty || !isValid} loading={isLoading}>
              Log in
            </FormButton>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
