import React, { Suspense, lazy } from "react";
import { render } from "react-dom";
import "./index.scss";
import Loader from "./components/Loader";

const App = lazy(() => import("./App"));
const rootElement = document.querySelector("#root");

render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
  rootElement
);
