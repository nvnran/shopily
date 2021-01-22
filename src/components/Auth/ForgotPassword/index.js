import React, { useState } from "react";
import AuthLayout from "../../../ui/AuthLayout";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPasswordComponent = ({ history }) => {
  const [email, setEmail] = useState("");
  const [btnText, setBtnText] = useState("Submit");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setBtnText(`<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`);
    await auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail("");
        toast.success("password reset link has been sent to your email");
        setTimeout(() => {
          setBtnText("Submit");
        }, 5000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
        <div className="authTitle">Forgot Password</div>
        <form onSubmit={handleForgotPassword} className="registerSection">
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
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-submit"
              dangerouslySetInnerHTML={{ __html: btnText }}
              disabled={!email}
            />
          </div>
        </form>
        <div className="row justify-content-around">
          <small>
            <Link to="/auth/login">Back to Login</Link>
          </small>
        </div>
      </AuthLayout>
    </>
  );
};

export default ForgotPasswordComponent;
