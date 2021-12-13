import { Typography } from "@mui/material";
import React from "react";
import "./transactions.css";
export const Transactions = () => {
  return (
    <div className="monthContainer">
      <button className="months">Jan</button>
      <button className="months">Fec</button>
      <button className="months">Mar</button>
      <button className="months">Apr</button>
      <button className="months">May</button>
      <button className="months">June</button>
      <button className="months">July</button>
      <button className="months">Aug</button>
      <button className="months">Sep</button>
      <button className="months">Oct</button>
      <button className="months">Nov</button>
      <button className="months">Dec</button>
      <div className="stats">
        <Typography className="typo">Income</Typography>
        <Typography className="typo">Outcome</Typography>
      </div>
    </div>
  );
};
