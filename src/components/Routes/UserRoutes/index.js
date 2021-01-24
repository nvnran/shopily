import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Loader";

const UserRouteComponent = ({ children, ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Loader />
  );
};

export default UserRouteComponent;
