import "./App.css";
import React, { useState } from "react";
import poolData from "./poolData";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from './pages/Dashboard/Dashboard'

import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, VerifyContact, withAuthenticator , } from 'aws-amplify-react';
import CostumFlow from './signIn/CostumFlow'
Amplify.configure(poolData);

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

// export default App;

export default withAuthenticator(App,false,[
  <CostumFlow />,
  ]
);
