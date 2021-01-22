import React, { useState } from "react";
import AuthLayout from "../../../ui/AuthLayout";
import { auth } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterCompleteComponent = () => {
  const [email, setEmail] = useState(
    window.localStorage.getItem("emailForSignIn")
  );
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified === true) {
        window.localStorage.removeItem("emailForSignIn");
        let user = auth.currentUser;
        await user.updatePassword(password);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const validateEmail = (value) => {
    let emailError;
    if (!value) {
      emailError = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      emailError = "Invalid email address";
    }
    toast.error(emailError);
  };

  return (
    <>
      <AuthLayout>
        <ToastContainer />
        <div id="recaptcha-container"></div>
        <div className="authTitle">Create Account</div>
        <form onSubmit={handleRegister} className="registerSection">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              disabled
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Mobile Number"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={10}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default RegisterCompleteComponent;
