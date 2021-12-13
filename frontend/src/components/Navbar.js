import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./navbar.css";
import axios from "axios";

axios
  .get(
    "https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/652c5c67-c09f-43ae-834a-a5ceae383535"
  )
  .then((response) => {
    console.log(response);
  });
const Favbar = () => {
  const [balance, setBalance] = useState(0);
  return (
    <div className="container">
      <h3 className="username">Emri</h3>
      <AccountCircleIcon />
    </div>
  );
};

export default Favbar;
