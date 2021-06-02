import { LOADING_STATUS } from "@shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus, subscribe } from "../subscriptionSlice";

export const useSubscription = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);

  const handleSubscribe = (values, actions) => {
    dispatch(subscribe({ values, actions }));
  };

  return {
    isLoading: status === LOADING_STATUS,
    onSubscribe: handleSubscribe,
  };
};
