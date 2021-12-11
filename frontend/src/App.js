import "./App.css";
import React from "react";
import poolData from "./poolData";
import Amplify, { Auth } from 'aws-amplify';
import { AmplifySignOut } from "@aws-amplify/ui-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import SignIn from './signIn/SignIn'


Amplify.configure(poolData);

async function confirmSignUp() {
  try {
    await Auth.confirmSignUp('tao', 123);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </Router>
      </div>
      <AmplifySignOut />
    </div>
  );
}


export default withAuthenticator(App,false,[
  <SignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <SignUp/>,
  <ConfirmSignUp/>,
  <ForgotPassword/>,
  <RequireNewPassword />]
);
