import "./App.css";
import React, { useState,useEffect, createContext } from "react";
import poolData from "./poolData";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from './pages/Dashboard/Dashboard'
import CostumFlow from './signIn/CostumFlow'
import {Transactions} from './pages/Transactions'
import {UserContext} from '../src/context/UserContext'
import axios from "axios";
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignUp, VerifyContact, withAuthenticator , } from 'aws-amplify-react';
import ChangePassword from './pages/ChangePassword';

Amplify.configure(poolData);
const App=  ()=> {
  const [user,setUser]=useState(null)
  
  const  setUserSub = async ()=>{
    const {attributes} = await Auth.currentAuthenticatedUser()
    setUser(attributes.sub)
  }
  useEffect(()=>{
    setUserSub();
  },[])
  if (user !== null ){
  return (
    <UserContext.Provider value={user}>
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Dashboard />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/transactions' element={<Transactions />}></Route>
            <Route path='/changePassword' element={<ChangePassword />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
    </UserContext.Provider>
  );
}
return (
  <h1>Hello</h1>
)
}

// export default App;

export default withAuthenticator(App,false,[
  <CostumFlow />,
  ]
);
