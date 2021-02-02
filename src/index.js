import React from "react";
import ReactDOM from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import App from "../src/components/App/App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap-4-grid/css/grid.min.css";
import "./style/datepicker.css";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
