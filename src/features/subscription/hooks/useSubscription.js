import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { LOADING_STATUS } from "@shared/constants";
import { selectStatus, subscribe } from "../subscriptionSlice";

export const useSubscription = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    const schema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    });

    try {
      setError("");
      await schema.validate({ email });
      await dispatch(subscribe({ email }));
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    email,
    setEmail,
    isLoading: status === LOADING_STATUS,
    error,
    onSubscribe: handleSubscribe,
  };
};
