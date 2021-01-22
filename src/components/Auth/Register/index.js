import React, { useState } from "react";
import { Select } from "antd";
import AuthLayout from "../../../ui/AuthLayout";
import countryCodesData from "../../../data/telCountryCodes.json";
import firebase from "../../Firebase";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [fullName, setFullName] = useState("");
  const [mainSection, setMainSection] = useState(true);
  const [otpSection, setOtpSection] = useState(false);
  const [passwordSection, setPasswordSection] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpText, setOtpText] = useState("Submit");
  const [passText, setPassText] = useState("Submit");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    var obj = {
      name: fullName,
      email: email,
      phonenumber: countryCode + phoneNumber,
    };
    console.log(obj);
    setOtpSection(true);
    signInSubmit();
  };

  const handleSelectCC = (e) => {
    setCountryCode(e);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassText(`<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`);
    if (password === confirmPassword) {
      let user = auth.currentUser;
      user
        .updatePassword(password)
        .then(() => {
          user
            .sendEmailVerification()
            .then(function () {
              toast.success(
                "Registration complete. you can now Login. Please take a moment to verify your email."
              );
              auth.signOut();
              setTimeout(() => {
                window.location.replace("/auth/login");
              }, 4000);
            })
            .catch((err) => {
              setError(err.message);
              toast.error(error);
            });
        })
        .catch((err) => {
          setError(err.message);
          toast.error(error);
        });
    }
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    toast.error(error);
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  };

  const getPhoneNumberFromUserInput = () => {
    return countryCode + phoneNumber;
  };

  const signInSubmit = () => {
    setUpRecaptcha();
    setOtpSection(true);

    var phoneNumber = getPhoneNumberFromUserInput();
    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOtp = (e) => {
    e.preventDefault();
    setOtpText(`<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`);
    window.confirmationResult
      .confirm(otp)
      .then(function (result) {
        const user = auth.currentUser;
        user.updateEmail(email).then(() => {
          console.log("Email Updated");
          user
            .updateProfile({
              displayName: fullName,
            })
            .then(() => {
              console.log("Name Updated");
              setMainSection(false);
              setOtpSection(false);
              setPasswordSection(true);
            });
        });
      })
      .catch((err) => {
        console.log(err.code);
        setError(err.message);
        toast.error(error);
      });
  };

  const { Option } = Select;

  return (
    <>
      <AuthLayout>
        <div id="recaptcha-container"></div>
        <div className="authTitle">Create Account</div>
        {mainSection ? (
          <form onSubmit={handleRegister} className="registerSection">
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
              <Select
                value={countryCode}
                onChange={handleSelectCC}
                style={{ textAlign: "left" }}
              >
                {countryCodesData.map((cc, i) => (
                  <Option value={cc.code} key={i}>
                    {cc.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
              />
            </div>
            <div className="form-group">
              {!otpSection ? (
                <button type="submit" className="btn btn-submit">
                  Submit
                </button>
              ) : null}
            </div>
          </form>
        ) : null}
        {otpSection ? (
          <form onSubmit={handleOtp} className="otpSection">
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                id="otp"
                name="otp"
                placeholder="O T P"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-submit"
                dangerouslySetInnerHTML={{ __html: otpText }}
              />
            </div>
          </form>
        ) : null}
        {passwordSection ? (
          <form onSubmit={handlePassword} className="passwordSection">
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
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-submit"
                dangerouslySetInnerHTML={{ __html: passText }}
              />
            </div>
          </form>
        ) : null}
        <div className="row justify-content-around">
          <small>
            Have an account? <Link to="/auth/login">Login</Link>
          </small>
        </div>
      </AuthLayout>
    </>
  );
};

export default RegisterComponent;
