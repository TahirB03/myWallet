import React, { useState } from "react";
import {Auth} from 'aws-amplify'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./SignIn.css";
const SignIn = () => {
  const [credentials, setCredential] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e)=>{
      setCredential({...credentials,[e.target.name]:e.target.value})
  }
  let buttonIsDisabled = (credentials.email!=='' && credentials.password!=='')? false : true;
  const handleSignIn = async ()=>{
      try {
          const user = await Auth.signIn(credentials.username,credentials.password)
          console.log(user);
      } catch (error) {
          console.log(error);
      }
  }
  return (
    <div className="signIn">
      <div className="imageLogo">This is a image</div>
      <div className="signInForm">
        <div className="appName">
          <h1>My Wallet</h1>
        </div>
        <div className="form">
          <TextField
            id="outlined-required"
            className='inputRounded'    
            label="Username"
            name='username'
            fullWidth={true}
            onChange={handleChange}
          />
          <TextField
            id="outlined-password-input"
            className='inputRounded'
            label="Password"
            name='password'
            type="password"
            fullWidth={true}
            onChange={handleChange}
            sx={{marginTop:'15px'}}
          />
        </div>
        <div className="forgotPassword">
            <p className="forgotPassword_label">Forgot password?</p>
        </div>
        <Button 
        variant="contained"
        disabled={buttonIsDisabled}
        color="warning"
        sx={{borderRadius:"40px",height:"45px"}}
        onClick={handleSignIn}
        >
            Log in
        </Button>
        <div className="registerNow">
            <p className="registerNow_label">Don't have an account yet? </p>
            <span className="registerNow_span"> Register now</span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
