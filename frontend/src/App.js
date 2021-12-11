import "./App.css";
import poolData from "./poolData";
import Amplify from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(poolData);

function App() {
  return (
    <div className="App">
      <div>
        <AmplifySignOut />
        hello
      </div>
    </div>
  );
}

export default withAuthenticator(App);
