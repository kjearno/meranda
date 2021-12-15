import { Formik, Form } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import * as Yup from "yup";

import { AuthTemplate, useAuth, usePublicRoute } from "@features/auth";
import {
  FormButton,
  FormGroup,
  Paper,
  PasswordField,
  TextField,
} from "@shared/components";

export default function Login() {
  usePublicRoute();
  const { isLoading, onLogin } = useAuth();

  return (
    <AuthTemplate>
      <Helmet title="Log in" />

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
    </AuthTemplate>
  );
}
