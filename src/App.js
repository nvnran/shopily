import React, { useEffect, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./components/Firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const RegisterComplete = lazy(() =>
  import("./components/Auth/RegisterComplete")
);
const ForgotPassword = lazy(() => import("./components/Auth/ForgotPassword"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "AUTH_LOGIN",
              payload: {
                id: res.data._id,
                name: res.data.name,
                phone_number: res.data.phone_number,
                email: res.data.email,
                loggedIn: true,
                token: idTokenResult.token,
                role: res.data.role,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => user();
  }, [dispatch]);

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
    {
      pageLink: "/auth/forgot-password",
      component: ForgotPassword,
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
