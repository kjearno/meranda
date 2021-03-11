import { message } from "antd";
import { store } from "@lib/store";

export const handleError = (action, { err, showMessages = true }) => {
  if (err.name === "ForbiddenError") {
    store.dispatch(action(err));

    if (showMessages) {
      message.error(err.message);
    }

    return;
  }

  if (err.name === "NotFoundError") {
    store.dispatch(action(err));

    return;
  }

  if (err.response && err.response.status.toString().startsWith("4")) {
    const error = err.response.data;

    store.dispatch(action(error));

    if (showMessages) {
      message.error(error.message);
    }

    return;
  }

  store.dispatch(action(err));

  if (showMessages) {
    message.error("Something went wrong. Please refresh the page");
  }
};
