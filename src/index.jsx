import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./pages/_app";
import { store } from "./shared/lib/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
