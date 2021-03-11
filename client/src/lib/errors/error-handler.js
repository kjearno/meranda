import { toast } from "react-toastify";
import { store } from "@lib/store";

export const handleError = (action, { err, showMessages = true }) => {
  if (err.name === "NotFoundError") {
    store.dispatch(action(err));
    return;
  }

  if (err.response && err.response.status.toString().startsWith("4")) {
    const error = err.response.data;
    store.dispatch(action(error));

    if (showMessages) {
      const { message } = error;
      toast.error(message, { toastId: message });
    }

    return;
  }

  store.dispatch(action(err));

  if (showMessages) {
    const message = "Something went wrong. Please refresh the page";
    toast.error(message, { toastId: message });
  }
};
