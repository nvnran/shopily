import React, { useState, useEffect } from "react";
import AuthLayout from "../../../ui/AuthLayout";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

const LoginComponent = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Login");
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        window.location.replace("/");
      }
    });
  }, []);

  const validateEmail = (value) => {
    let emailError;
    if (!value) {
      emailError = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      emailError = "Invalid email address";
    }
    toast.error(emailError);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setBtnText(`<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`);

    try {
      const result = auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "AUTH_LOGIN",
        payload: {
          id: user.uid,
          name: user.displayName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          loggedIn: true,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        toast.error("Invalid email or password");
        setBtnText("Login");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Too many login attempts. Please try after some time");
        setBtnText("Login");
      } else if (err.code === "auth/user-not-found") {
        toast.error("Email not recognized, please check your email");
        setBtnText("Login");
      }
    }
  };
  return (
    <>
      <AuthLayout>
        <ToastContainer />
        <div className="authTitle">Login</div>
        <form onSubmit={handleLogin} className="loginSection">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "40px" }}
              onBlur={() => validateEmail(email)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-submit"
              dangerouslySetInnerHTML={{ __html: btnText }}
            />
          </div>
        </form>
        <div className="row justify-content-around">
          <small>
            Don't have an account? <Link to="/auth/register">Create One</Link>
          </small>
        </div>
        <div className="row justify-content-around">
          <small>
            Forgot your password?{" "}
            <Link to="/auth/forgot-password">Reset Here</Link>
          </small>
        </div>
      </AuthLayout>
    </>
  );
};

export default LoginComponent;
