import React from "react";
import { Row, Col } from "react-flexbox-grid";

import { IconButton } from "@components/IconButton";
import { MailIcon } from "../../assets";
import { useSubscription } from "../../hooks";
import styles from "./Subscription.module.scss";

export function Subscription() {
  const { email, setEmail, isLoading, error, onSubscribe } = useSubscription();

  const handleUserInput = (e) => {
    setEmail(e.target.value);
  };

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
        <form onSubmit={onSubscribe}>
          <div className={styles.formGroup}>
            <input
              className={styles.formField}
              name="email"
              type="text"
              placeholder="Enter your email"
              onChange={handleUserInput}
              value={email}
            />
            <IconButton icon={<MailIcon />} loading={isLoading} />
          </div>
          <div className={styles.error}>{error}</div>
        </form>
      </Col>
    </Row>
  );
}
