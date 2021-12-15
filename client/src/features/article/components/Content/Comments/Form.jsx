import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { useAuth } from "@features/auth";
import { Button, Section } from "@shared/components";
import { useForm } from "../../../hooks";
import styles from "./Form.module.scss";

export function Form() {
  const { isAuthenticated } = useAuth();
  const { isLoading, onCommentSend } = useForm();

  if (isAuthenticated) {
    return (
      <>
        <Section.Title>Add a comment</Section.Title>

        <div className={styles.form}>
          <Formik
            initialValues={{ text: "" }}
            validateOnBlur={false}
            validationSchema={Yup.object({
              text: Yup.string().required("Enter your comment text"),
            })}
            onSubmit={onCommentSend}
          >
            <FormikForm>
              <div className={styles.formGroup}>
                <div className={styles.error}>
                  <ErrorMessage name="text" />
                </div>
                <label className={styles.label} htmlFor="text">
                  Message
                </label>
                <Field
                  className={styles.input}
                  as="textarea"
                  id="text"
                  name="text"
                  cols="30"
                  rows="10"
                />
              </div>
              <Button loading={isLoading}>Send</Button>
            </FormikForm>
          </Formik>
        </div>
      </>
    );
  }

  return (
    <p>
      To add a comment, <Link to="/auth/login">log in</Link>.
    </p>
  );
}
