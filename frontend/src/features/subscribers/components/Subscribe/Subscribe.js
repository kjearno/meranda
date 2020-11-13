import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-flexbox-grid";
import { useSubscribers } from "../../hooks";

import { MailIcon } from "@ui/assets";
import { IconButton } from "@ui/components";
import styles from "./Subscribe.module.scss";

export const Subscribe = () => {
  const { isLoading, onSubscribe } = useSubscribers();

  return (
    <Row className={styles.wrapper}>
      <Col md={5}>
        <h2 className={styles.title}>Newsletter Subscribe</h2>
        <p className={styles.text}>
          If you want to receive our newsletter, please subscribe by entering
          your email address.
        </p>
      </Col>

      <Col md={6} lg={5}>
        <Formik
          initialValues={{ email: "" }}
          validateOnBlur={false}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required")
          })}
          onSubmit={onSubscribe}
        >
          <Form>
            <div className={styles.formGroup}>
              <Field
                className={styles.formField}
                name="email"
                type="text"
                placeholder="Enter your email"
              />

              <IconButton type="submit" icon={MailIcon} loading={isLoading} />
            </div>

            <div className={styles.error}>
              <ErrorMessage name="email" />
            </div>
          </Form>
        </Formik>
      </Col>
    </Row>
  );
};
