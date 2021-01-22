import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const RegisterComplete = lazy(() =>
  import("./components/Auth/RegisterComplete")
);

const App = () => {
  const pages = [
    {
      pageLink: "/",
      component: Home,
    },
    {
      pageLink: "/home",
      component: Home,
    },
    {
      pageLink: "/auth/login",
      component: Login,
    },
    {
      pageLink: "/auth/register",
      component: Register,
    },
    {
      pageLink: "/auth/register/complete",
      component: RegisterComplete,
    },
  ];

  return (
    <Router>
      <Switch>
        {pages.map((page, idx) => {
          return (
            <Route
              exact
              path={page.pageLink}
              render={({ match }) => <page.component />}
              key={idx}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default App;
