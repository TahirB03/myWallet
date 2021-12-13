import React from "react";
import "./Dashboard.css";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import deposit from "./deposit.png";
import withdraw from "./withdraw.png";

import DashboardNavbar from "./DashboardNavbar";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <DashboardNavbar />
      <div className="dashboardMonth">
        <h3>{new Date().toLocaleString("default", { month: "long" })}</h3>
      </div>
      <div className="events_byMonth">
        <Box
          onClick={() => navigate("/s")}
          className="boxContainer"
          sx={{
            marginTop: "30px",
            width: 160,
            height: 80,
            border: "1px solid gray",
            borderRadius: "25px",
            padding: "5px 10px",
          }}
        >
          <img
            src={deposit}
            style={{ marginTop: "10px" }}
            width={50}
            height={50}
          ></img>
          <div className="boxContainer_text">
            <p style={{ display: "block", color: "green" }}>Income</p>
            <p>$ 600</p>
          </div>
        </Box>
        <Box
          onClick={() => navigate("/sa")}
          className="boxContainer"
          sx={{
            marginTop: "30px",
            width: 160,
            height: 80,
            border: "1px solid gray",
            borderRadius: "25px",
            padding: "5px 10px",
          }}
        >
          <img
            src={withdraw}
            style={{ marginTop: "10px" }}
            width={50}
            height={50}
          ></img>
          <div className="boxContainer_text">
            <p style={{ display: "block", color: "red" }}>Outcome</p>
            <p>$ 600</p>
          </div>
        </Box>
      </div>
      <Link
        to="/transactions"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        Show Details
      </Link>
    </div>
  );
};

export default Dashboard;
