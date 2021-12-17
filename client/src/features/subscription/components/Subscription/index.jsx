import MailIcon from "@material-ui/icons/Mail";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Row, Col } from "react-flexbox-grid";
import * as Yup from "yup";

import { IconButton } from "@shared/components";
import { useSubscription } from "../../hooks";
import styles from "./Subscription.module.scss";

export function Subscription() {
  const { isLoading, onSubscribe } = useSubscription();

  return (
    <Row className={styles.subscription}>
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
              .required("Email is required"),
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

              <IconButton icon={<MailIcon />} loading={isLoading} />
            </div>

            <div className={styles.error}>
              <ErrorMessage name="email" />
            </div>
          </Form>
        </Formik>
      </Col>
    </Row>
  );
}
