import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./profileNavbar.css";

export const ProfileNavbar = () => {
  const url =
    "https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/652c5c67-c09f-43ae-834a-a5ceae383535";
  const [balance, setBalance] = useState(100);

  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response);
      setBalance(response.data.user.balance);
    });
  }, [url]);

  return (
    <div className="container">
      <div className="backArrow">
        <ArrowBackIosIcon />
      </div>
      <Link to="/transactions" className="tra">
        Transactions
      </Link>

      <h3 className="username">Emri</h3>
      <div className="imgIcon"></div>
      <div className="totalBalanceNumber">{balance}$</div>
      <h3 className="totalBalanceText">Total Balance</h3>
    </div>
  );
};
export default ProfileNavbar;
