import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import GlobalState from "./context/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <GlobalState>
      <App />
      <ToastContainer />
    </GlobalState>
  // </Reasct.StrictMode>
);
