import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <div className="container pt-5">
        <div className="auth-container">{children}</div>
        <hr className="authHr" />
      </div>
    </>
  );
};

export default AuthLayout;
