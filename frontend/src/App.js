import "./App.css";

import poolData from "./poolData";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

Amplify.configure(poolData);

function App() {
  // const signOut = async () => {
  //   try {
  //     await Auth.signOut();
  //   } catch (err) {
  //     console.log("Error signing out", err);
  //   }
  // };
  
  return (
    <div className="App">
      <div>
        {/* <button className="button-34" onClick={signOut}>
          Sign out
        </button> */}
        <AmplifySignOut />
        <Router>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}


export default withAuthenticator(App, false, [], null, null, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
    signUpFields: [
      { label: "Name", key: "name", required: true, type: "string" },
    ],
  },
});
