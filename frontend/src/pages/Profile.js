import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from "../components/ProfileNavbar";
import { Auth } from "aws-amplify";
import Password from "../images/Password.png";
import Info from "../images/Info.png";
import Privacy from "../images/Privacy policy.png";
import Currency from "../images/Currency.png";
import { UserContext } from "../context/UserContext";
import "./profile.css";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const signOut = async (e) => {
  e.preventDefault();
  await Auth.signOut();
  window.location.reload();
};

const Profile = () => {
  const userId = useContext(UserContext);
  const [currency, setCurrency] = useState("$");
  const [isCurrencyShow, setIsCurrencyShow] = useState(false);
  const handleCurrency = (e) => {
    setCurrency(e.target.name);
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/user/updateUser/${userId}`,
        { currency: currency }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/${userId}`
        );
        setCurrency(data?.user?.currency);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [userId]);
  return (
    <div>
      <ProfileNavbar currency={currency} />
      <p className="settings">Settings</p>
      <div>
        <button
          className="currency"
          onClick={() => {
            if (isCurrencyShow === false) {
              setIsCurrencyShow(true);
            } else {
              setIsCurrencyShow(false);
              handleUpdate();
            }
          }}
        >
          <img
            className="currency-logo"
            width={30}
            height={30}
            src={Currency}
            alt="Currency"
          />
          Change currency
        </button>
        {isCurrencyShow === true && (
          <div className="radioCurrency">
            <FormControl component="fieldset">
              <FormLabel component="legend">Select your currency</FormLabel>
              <RadioGroup
                row
                aria-label="currency"
                name="row-radio-buttons-group"
                value={currency}
                onChange={handleCurrency}
              >
                <FormControlLabel
                  name="€"
                  control={<Radio checked={currency === "€"} />}
                  label="€"
                />
                <FormControlLabel
                  name="$"
                  control={<Radio checked={currency === "$"} />}
                  label="$"
                />
              </RadioGroup>
            </FormControl>
          </div>
        )}
        <Link style={{ textDecoration: "none" }} to="/changePassword">
          <button className="password">
            <img
              className="password-logo"
              width={30}
              height={30}
              src={Password}
              alt="Password"
            />
            Change password
          </button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/about">
          <button className="about-us">
            <img
              className="about-us-logo"
              width={30}
              height={30}
              src={Info}
              alt="about-us"
            />
            About us
          </button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/policy">
          <button className="policy">
            <img
              className="policy-logo"
              width={30}
              height={30}
              src={Privacy}
              alt="policy"
            />
            Privacy & Policy
          </button>
        </Link>
      </div>
      <button className="logOut" onClick={signOut}>
        Log out
      </button>
    </div>
  );
};

export default Profile;
