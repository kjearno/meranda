import { useDispatch, useSelector } from "react-redux";
import {
  subscribersOperations,
  subscribersSelectors
} from "../modules/subscribers";

export const useSubscribers = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(subscribersSelectors.everything);

  const handleSubscribe = values => {
    dispatch(subscribersOperations.subscribe(values));
  };

  return {
    isLoading: loading,
    error,
    onSubscribe: handleSubscribe
  };
};
