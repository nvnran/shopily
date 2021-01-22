import React from "react";

const LoaderComponent = () => {
  return (
    <>
      <div className="loader">
        <img
          src={require("../../assets/img/loader.gif").default}
          alt=""
          className="img-fluid"
        />
      </div>
    </>
  );
};

export default LoaderComponent;
