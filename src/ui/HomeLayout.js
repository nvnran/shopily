import React from "react";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container mt-5">{children}</div>
    </>
  );
};

export default HomeLayout;
