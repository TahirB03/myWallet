import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./navbar.css";
import Avatar from "../images/Avatar.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AboutNavbar = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  console.log(user);
  const [userDetails, setUserDetails] = useState("");

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/${user}`
      );
      setUserDetails(...userDetails, data.user);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    fetchUserDetails();
  }, [ user]);

  return (
    <div className="dashboardNavbar">
      <div className="dashboardNavbar_header">
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <p
            style={{
              fontSize: "18px",
              color: "white",
              textDecoration: "none",
              display: "flex",
            }}
          >
            <ArrowBackIosIcon />
            About us
          </p>
        </Link>
        <div
          className="dashboardNavbar_user"
          onClick={() => navigate("/profile")}
        >
          <div
            style={{ marginRight: "10px", fontWeight: "400", textAlign: "end" }}
          >
            <div className="dashboardNavbar_user_greetin">Hello</div>
            <div className="dashboardNavbar_user_greetin">
              {localStorage.getItem(
                "CognitoIdentityServiceProvider.3ae3cn84i7v4j30cg0v9o8bp50.LastAuthUser"
              )}
            </div>
          </div>
          <img style={{clipPath: "circle(50% at 50% 50%)"}} alt="Profile" src={userDetails?.image} width="35" onError={(e)=> {e.target.onError=null; e.target.src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Avatar.png"}}></img>
        </div>
      </div>
      <div className="dashboardNavbar_body">
        <div style={{ marginTop: "5px" }} className="dashboardNavbar_balance">
          <span
            style={{
              position: "absolute",
              fontWeight: "300",
              left: "-20px",
              width: "10px",
              height: "36px",
              fontSize: "25px",
            }}
          >
            $
          </span>
          {userDetails.balance !== undefined && (
            <h1 style={{ fontSize: "32px", display: "inline-block" }}>
              {userDetails.balance.toFixed(2)}
            </h1>
          )}
        </div>
        <h1
          style={{ fontWeight: "200", fontSize: "16px", marginBottom: "20px" }}
        >
          Total Balance
        </h1>
      </div>
    </div>
  );
};
export default AboutNavbar;
