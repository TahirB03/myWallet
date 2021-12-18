import "./App.css";
import React, { useState, useEffect } from "react";
import poolData from "./poolData";
import Amplify, { Auth } from "aws-amplify";
import Profile from "./pages/Profile";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CostumFlow from "./signIn/CostumFlow";
import { Transactions } from "./pages/Transactions";
import { UserContext } from "../src/context/UserContext";
import { withAuthenticator } from "aws-amplify-react";
import ChangePassword from "./pages/ChangePassword";
import NewExpense from "./pages/NewExpense/NewExpense";
import NewIncome from "./pages/NewIncome/NewIcome";
import About from "./pages/about";
import Policy from "./pages/policy";
import Loader from "react-loader-spinner";

Amplify.Auth.configure(poolData);

const App = () => {
  const [user, setUser] = useState(null);
  const setUserSub = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    setUser(attributes.sub);
  };
  useEffect(() => {
    setUserSub();
  }, []);
    if (user !== null ){
    return (
      <UserContext.Provider value={user}>
        <div className='App'>
          <div>
            <Router>
              <Routes>
                <Route exact path='/' element={<Dashboard />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/addExspense/:id' element={<NewExpense />} />
                <Route path='/addIncome/:id' element={<NewIncome />} />
                <Route path='/transactions' element={<Transactions />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/policy' element={<Policy />}></Route>
                <Route
                  path='/changePassword'
                  element={<ChangePassword />}
                ></Route>
              </Routes>
            </Router>
          </div>
        </div>
      </UserContext.Provider>
    );
  }
  return (
    <div className="app">
      <div className="loader">
        <Loader type="Puff" color="#00BFFF" height={200} width={200} />
      </div>
    </div>
  );
};

// export default App;

export default withAuthenticator(App, false, [<CostumFlow />]);
