import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormButton, FormGroup, PasswordField } from "@shared/components";
import { useProfile } from "../../hooks";

export function Password() {
  const { isLoading, onPasswordUpdate } = useProfile();

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        currentPassword: Yup.string().required("Fill in this field"),
        newPassword: Yup.string()
          .min(8, "Minimum length: 8 characters")
          .required("Fill in this field"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Password mismatch")
          .required("Fill in this field"),
      })}
      onSubmit={onPasswordUpdate}
    >
      {({ errors, touched, dirty, isValid }) => (
        <Form>
          <FormGroup>
            <PasswordField
              name="currentPassword"
              label="Current Password"
              touched={touched}
              errors={errors}
            />
          </FormGroup>
          <FormGroup>
            <PasswordField
              name="newPassword"
              label="New Password"
              touched={touched}
              errors={errors}
            />
          </FormGroup>
          <FormGroup>
            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              touched={touched}
              errors={errors}
            />
          </FormGroup>

          <FormButton disabled={!dirty || !isValid} loading={isLoading}>
            Save
          </FormButton>
        </Form>
      )}
    </Formik>
  );
}
