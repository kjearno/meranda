import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth } from "@features/auth";
import { useComments } from "@features/comments";

import { Button, SectionTitle } from "@ui/components";
import styles from "./CommentForm.module.scss";

export const CommentForm = ({ postId }) => {
  const { isAuthenticated } = useAuth();
  const { isLoading, onCommentSend } = useComments();

  if (!isAuthenticated) {
    return (
      <p>
        To leave comments, <Link to="/auth/login">log in</Link>.
      </p>
    );
  }

  return (
    <>
      <SectionTitle>Leave a comment</SectionTitle>

      <div className={styles.formBox}>
        <Formik
          initialValues={{ text: "", postId }}
          validateOnBlur={false}
          validationSchema={Yup.object({
            text: Yup.string().required("Enter your comment text")
          })}
          onSubmit={onCommentSend}
        >
          <Form>
            <div className={styles.formGroup}>
              <div className={styles.error}>
                <ErrorMessage name="text" />
              </div>
              <label htmlFor="text">Message</label>
              <Field
                className={styles.input}
                as="textarea"
                id="text"
                name="text"
                cols="30"
                rows="10"
              />
            </div>
            <Button type="submit" loading={isLoading}>
              Send
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};
