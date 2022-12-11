import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ScrollToTop from "react-scroll-to-top";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

export const ScrollToTops = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <ScrollToTops />
        <App />
        <ScrollToTop
          title="Go to top"
          smooth
          style={{
            justifyContent: "center",
            display: "grid",
            alignContent: "center",
            zIndex: 1000,
          }}
        />
      </BrowserRouter>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
