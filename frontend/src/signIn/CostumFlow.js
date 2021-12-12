import React, { useState } from "react";
import { Auth } from "aws-amplify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SignIn.css";

const initialCredentials = {
  username: "",
  password: "",
  email: "",
}

const CostumFlow = () => {
  const [flowStep, setFlowStep] = useState("signIn");
  const [code, setCode] = useState();
  const [codeError,setCodeError]=useState(false)

  const [credentials, setCredential] = useState(initialCredentials);
  const handleChange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value });
  };
  let buttonIsDisabled =
    credentials.email !== "" && credentials.password !== "" ? false : true;
  let isConfirmDisabled = 
    code !== undefined ? false : true;
  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(
        credentials.username,
        credentials.password
      );
      console.log(user);
    } catch (error) {
      console.log(error);
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

  const handleConfirmCode = async ()=>{
    try {
          const confirmResponse = await Auth.confirmSignUp(credentials.username,code)
          if (confirmResponse==="SUCCESS"){
            await Auth.signIn({username:credentials.username,password:credentials.password})// E fut userin automatikisht
          }
    } catch (error) {
      if (error.message === "Invalid code provided, please request a code again."){
          setCodeError(true)
      }
    }
  }

  if (flowStep === "confirmSignUp") {
    return (
      <div className="signUp authentication_screen">
        <div className="imageLogo">This is a image</div>
        <div className="signInForm">
          <div className="appName">
            <h1>My Wallet</h1>
          </div>
          <div className="form">
            <TextField
              id="outlined-read-only-input"
              className="inputRounded"
              label="Username"
              autoFocus={true}
              fullWidth={true}
              value={credentials.username}
              InputProps={{
                readOnly: true,
              }}
              sx={{marginBottom:"15px"}}
            />
            <TextField
              id="outlined-required"
              className="inputRounded"
              label="Code"
              name="username"
              value={code}
              fullWidth={true}
              onChange={
                (e) => {
                  setCode(e.target.value)
                  setCodeError(false);
                }
              }
            />
            {codeError && <p style={{color:"red",marginTop:"5px",marginLeft:"10px"}}>Incorrect code!</p>}
          </div>
          <Button
            variant="contained"
            disabled={buttonIsDisabled}
            color="warning"
            sx={{ borderRadius: "40px", height: "45px", marginTop:"15px"}}
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

  if (flowStep === "signUp") {
    return (
      <div className="signUp authentication_screen">
        <div className="imageLogo">This is a image</div>
        <div className="signInForm">
          <div className="appName">
            <h1>My Wallet</h1>
          </div>
          <div className="form">
            <TextField
              id="outlined-required"
              className="inputRounded"
              label="Username"
              name="username"
              fullWidth={true}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              className="inputRounded"
              label="Email"
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
            <p className="forgotPassword_label">Forgot password?</p>
          </div>
          <Button
            variant="contained"
            disabled={buttonIsDisabled}
            color="warning"
            sx={{ borderRadius: "40px", height: "45px" }}
            onClick={handleSignUp}
          >
            Register
          </Button>
          <div className="registerNow">
            <p className="registerNow_label">Already have an account</p>
            <span
              className="registerNow_span"
              onClick={() => setFlowStep("signIn")}
            >
              {" "}
              Log in
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="signIn authentication_screen">
      <div className="imageLogo">This is a image</div>
      <div className="signInForm">
        <div className="appName">
          <h1>My Wallet</h1>
        </div>
        <div className="form">
          <TextField
            id="outlined-required"
            className="inputRounded"
            label="Username"
            name="username"
            fullWidth={true}
            onChange={handleChange}
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
          <p className="forgotPassword_label">Forgot password?</p>
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
            className="registerNow_span"
            onClick={() => {
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
