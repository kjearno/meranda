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

export function Register() {
  const { isLoading, onRegister } = useAuth();

  return (
    <Paper>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
          username: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email format")
            .required("Fill in this field"),
          password: Yup.string()
            .min(8, "Minimum length: 8 characters")
            .required("Fill in this field"),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password")], "Password mismatch")
            .required("Fill in this field"),
          username: Yup.string()
            .min(3, "Minimum length: 3 characters")
            .required("Fill in this field"),
        })}
        validateOnBlur={false}
        onSubmit={onRegister}
      >
        {({ touched, errors, dirty, isValid }) => (
          <Form>
            <FormGroup>
              <TextField
                name="email"
                label="Email"
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

            <FormGroup>
              <PasswordField
                name="passwordConfirm"
                label="Confirm password"
                touched={touched}
                errors={errors}
              />
            </FormGroup>

            <FormGroup>
              <TextField
                name="username"
                label="Username"
                touched={touched}
                errors={errors}
              />
            </FormGroup>

            <FormButton disabled={!dirty || !isValid} loading={isLoading}>
              Sign up
            </FormButton>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
