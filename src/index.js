import React, { Suspense, lazy } from "react";
import { render } from "react-dom";
import "./index.scss";
import Loader from "./components/Loader";
import reducers from "./reducers";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const App = lazy(() => import("./App"));
const rootElement = document.querySelector("#root");
const store = createStore(reducers, composeWithDevTools());
render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  rootElement
);
