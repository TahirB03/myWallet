import React, { useState } from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./SignIn.css";

const initialCredentials = {
  username: "",
  password: "",
  email: "",
};

const CostumFlow = () => {
  const [flowStep, setFlowStep] = useState("signIn");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [logInError, setLogInError] = useState(false);
  const [credentials, setCredential] = useState(initialCredentials);
  const [forgotPasswordCredentials, setForgotPasswordCredentials] = useState({
    username: "",
    code: "",
    newPassword: "",
    userEmail: "",
  });
  const [forgotPasswordError, setForgotPasswordError] = useState({
    code: false,
    password: false,
  });

  const handleChange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value });
    setLogInError(false);
  };
  const handleChangepassword = (e) => {
    setForgotPasswordCredentials({
      ...forgotPasswordCredentials,
      [e.target.name]: e.target.value,
    });
    setForgotPasswordError({
      code: false,
      password: false,
    });
  };

  let buttonIsDisabled =
    credentials.username !== "" && credentials.password !== "" ? false : true;

  let isConfirmDisabled = code !== undefined ? false : true;

  const handleForget = async () => {
    try {
      const { CodeDeliveryDetails } = await Auth.forgotPassword(
        forgotPasswordCredentials.username
      );
      if (CodeDeliveryDetails) {
        setForgotPasswordCredentials({
          ...forgotPasswordCredentials,
          userEmail: CodeDeliveryDetails.Destination,
        });
        setFlowStep("forgotPassword2");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await Auth.forgotPasswordSubmit(
        forgotPasswordCredentials.username,
        forgotPasswordCredentials.code,
        forgotPasswordCredentials.newPassword
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
      if (
        error.message ===
        "Invalid verification code provided, please try again."
      ) {
        setForgotPasswordError({ ...setForgotPasswordError, code: true });
      }
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(
        credentials.username,
        credentials.password
      );
      console.log(user);
      window.location.reload();
    } catch (error) {
      if (error.message === "Incorrect username or password.") {
        setLogInError(true);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const { userConfirmed } = await Auth.signUp({
        username: credentials.username,
        password: credentials.password,
        attributes: {
          email: credentials.email,
        },
      });
      if (userConfirmed === false) {
        setFlowStep("confirmSignUp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmCode = async () => {
    try {
      const confirmResponse = await Auth.confirmSignUp(
        credentials.username,
        code
      );
      if (confirmResponse === "SUCCESS") {
        const { attributes } = await Auth.signIn({
          username: credentials.username,
          password: credentials.password,
        }); // E fut userin automatikisht
        const user = await axios.get(
          `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/addUser/${attributes.sub}`
        );
        window.location.reload();
      }
    } catch (error) {
      if (
        error.message === "Invalid code provided, please request a code again."
      ) {
        setCodeError(true);
      }
    }
  };

  if (flowStep === "confirmSignUp") {
    return (
      <div className="signUp authentication_screen">
        <img
          style={{ width: "100%" }}
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Image.png"
          alt=""
        />
        <div className="signInForm">
          <div className="appName">
            <h1>Habilis</h1>
          </div>
          <div className="form">
            <TextField
              id="outlined-read-only-input"
              className="inputRounded"
              notched={false}
              label="Username"
              autoFocus={true}
              fullWidth={true}
              value={credentials.username}
              key="Username"
              InputProps={{
                readOnly: true,
              }}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              id="outlined-required"
              className="inputRounded"
              label="Code"
              name="code"
              type="text"
              value={code}
              fullWidth={true}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeError(false);
              }}
            />
            {codeError && (
              <p style={{ color: "red", marginTop: "5px", marginLeft: "10px" }}>
                Incorrect code!
              </p>
            )}
          </div>
          <Button
            variant="contained"
            color="warning"
            sx={{ borderRadius: "40px", height: "45px", marginTop: "15px" }}
            onClick={handleConfirmCode}
            disabled={isConfirmDisabled}
          >
            Confirm Code
          </Button>
          <div className="registerNow">
            <p className="registerNow_label">Already have an account</p>
            <span
              className="registerNow_span"
              onClick={() => setFlowStep("signIn")}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (flowStep === "forgotPassword1") {
    return (
      <div className="signUp authentication_screen">
        <div className="imageLogo">
          <img
            style={{ width: "100%" }}
            src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Image.png"
            alt=""
          />
        </div>
        <div className="signInForm">
          <div className="appName">
            <h1>Habilis</h1>
          </div>
          <div className="form">
            <TextField
              id="outlined-required"
              className="inputRounded"
              value={forgotPasswordCredentials.username}
              label="Username"
              name="username"
              fullWidth={true}
              onChange={handleChangepassword}
            />
          </div>
          <div className="forgotPassword"></div>
          <Button
            variant="contained"
            color="warning"
            sx={{ borderRadius: "40px", height: "45px" }}
            onClick={handleForget}
          >
            Get the code
          </Button>
          <div className="registerNow">
            <p className="registerNow_label">Already have an account </p>
            <span
              style={{ cursor: "pointer" }}
              className="registerNow_span"
              onClick={() => setFlowStep("signIn")}
            >
              {"  "}Log in
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (flowStep === "forgotPassword2") {
    return (
      <div className="signUp authentication_screen">
        <img
          style={{ width: "100%" }}
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Image.png"
          alt=""
        />
        <div className="signInForm">
          <div className="appName">
            <h1>My Wallet</h1>
          </div>
          <div className="form">
            <TextField
              id="outlined-read-only-input"
              className="inputRounded"
              value={forgotPasswordCredentials.username}
              autoFocus={true}
              label="Username"
              name="username"
              fullWidth={true}
              InputProps={{
                readOnly: true,
              }}
              onChange={handleChangepassword}
            />
            <TextField
              id="outlined-required"
              className="inputRounded"
              label="Code"
              name="code"
              type="text"
              value={forgotPasswordCredentials.code}
              fullWidth={true}
              onChange={handleChangepassword}
              sx={{ marginTop: "15px" }}
            />
            {forgotPasswordError.code === true && (
              <p
                style={{ color: "red", fontSize: "12px", paddingLeft: "10px" }}
              >
                Code isn't correct
              </p>
            )}
            <TextField
              id="outlined-password-input"
              className="inputRounded"
              label="New Password"
              name="newPassword"
              value={forgotPasswordCredentials.newPassword}
              type="password"
              fullWidth={true}
              onChange={handleChangepassword}
              sx={{ marginTop: "15px" }}
            />
          </div>
          <div className="forgotPassword"></div>
          <Button
            variant="contained"
            color="warning"
            sx={{ borderRadius: "40px", height: "45px" }}
            onClick={handlePasswordUpdate}
          >
            Create new password
          </Button>
          <div className="registerNow">
            <p className="registerNow_label">Already have an account </p>
            <span
              style={{ cursor: "pointer" }}
              className="registerNow_span"
              onClick={() => setFlowStep("signIn")}
            >
              {"  "}Log in
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (flowStep === "signUp") {
    return (
      <div className="signUp authentication_screen">
        <div className="imageLogo">
          <img
            style={{ width: "100%" }}
            src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Image.png"
            alt=""
          />
        </div>
        <div className="signInForm">
          <div className="appName">
            <h1>Habilis</h1>
          </div>
          <div className="form">
            <TextField
              id="outlined-required"
              className="inputRounded"
              value={credentials.username}
              label="Username"
              name="username"
              fullWidth={true}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              className="inputRounded emailInputSignUp"
              label="Email"
              value={credentials.email}
              name="email"
              fullWidth={true}
              onChange={handleChange}
              sx={{ marginTop: "15px" }}
            />
            <TextField
              id="outlined-password-input"
              className="inputRounded"
              label="Password"
              name="password"
              type="password"
              fullWidth={true}
              onChange={handleChange}
              sx={{ marginTop: "15px" }}
            />
          </div>
          <div className="forgotPassword">
            <p
              style={{ cursor: "pointer" }}
              className="forgotPassword_label"
              onClick={() => setFlowStep("forgotPassword1")}
            >
              Forgot password?
            </p>
          </div>
          <Button
            variant="contained"
            disabled={buttonIsDisabled}
            color="warning"
            sx={{ borderRadius: "40px", height: "45px", cursor: "pointer" }}
            onClick={handleSignUp}
          >
            Register
          </Button>
          <div className="registerNow">
            <p className="registerNow_label">Already have an account </p>
            <span
              style={{ cursor: "pointer" }}
              className="registerNow_span"
              onClick={() => setFlowStep("signIn")}
            >
              {"  "}Log in
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="signIn authentication_screen">
      <div className="imageLogo">
        <img
          style={{ width: "100%" }}
          src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Image.png"
          alt=""
        />
      </div>
      <div className="signInForm">
        <div className="appName">
          <h1>Habilis</h1>
        </div>
        <div className="form">
          <TextField
            id="outlined"
            className="inputRounded"
            error={logInError}
            label="Username"
            value={credentials.username}
            autoFocus={true}
            name="username"
            fullWidth={true}
            onChange={handleChange}
          />
          <TextField
            id="outlined-password-input"
            className="inputRounded"
            label="Password"
            name="password"
            value={credentials.password}
            error={logInError}
            type="password"
            fullWidth={true}
            onChange={handleChange}
            sx={{ marginTop: "15px" }}
          />
          {logInError && (
            <p style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
              Password wasn't correct.Please check you username and password!
            </p>
          )}
        </div>
        <div className="forgotPassword">
          <p
            style={{ cursor: "pointer" }}
            className="forgotPassword_label"
            onClick={() => setFlowStep("forgotPassword1")}
          >
            Forgot password?
          </p>
        </div>
        <Button
          variant="contained"
          disabled={buttonIsDisabled}
          color="warning"
          sx={{ borderRadius: "40px", height: "45px" }}
          onClick={handleSignIn}
        >
          Log in
        </Button>
        <div className="registerNow">
          <p className="registerNow_label">Don't have an account yet? </p>
          <span
            style={{ cursor: "pointer" }}
            className="registerNow_span"
            onClick={() => {
              setCredential(initialCredentials);
              setFlowStep("signUp");
            }}
          >
            {" "}
            Register now
          </span>
        </div>
      </div>
    </div>
  );
};

export default CostumFlow;
