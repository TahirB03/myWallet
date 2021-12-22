import React, { useState } from "react";
import { Auth } from "aws-amplify";
import ChangePasswordNavbar from "../components/ChangePasswordNavbar";
import { Link } from "react-router-dom";
import "./changePassword.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });
  const [errors, setErrors] = useState({
    wrongPassword: false,
    unMatchedPassword: false,
  });

  const passwordChange = (e) => {
    if (e.target.name === "confirmedNewPassword") {
      if (e.target.value === password.newPassword) {
        setErrors({ ...errors, unMatchedPassword: false });
      } else {
        setErrors({ ...errors, unMatchedPassword: true });
      }
    }
    if (e.target.name === "oldPassword") {
      setErrors({ ...errors, wrongPassword: false });
    }
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlePassword = async () => {
    if (errors.wrongPassword === false && errors.unMatchedPassword === false) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          const response = await Auth.changePassword(
            user,
            password.oldPassword,
            password.newPassword
          );
          if (response === "SUCCESS") {
            navigate("/");
          }
        }
      } catch (error) {
        setErrors({ ...errors, wrongPassword: true });
      }
    }
  };
  return (
    <div>
      <ChangePasswordNavbar />
      <p className="settings">Change Password</p>
      <form>
        <div className="form-group">
          <input
            type="password"
            value={password.oldPassword}
            placeholder="Enter your old Password"
            name="oldPassword"
            className="costumPasswordInput"
            onChange={passwordChange}
          />
          {errors.wrongPassword && (
            <p style={{ color: "red", fontSize: "14px", marginLeft: "40px" }}>
              Your old password was incorrect
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            value={password.newPassword}
            placeholder="Enter your new Password"
            name="newPassword"
            className="costumPasswordInput"
            onChange={passwordChange}
          />
          {errors.unMatchedPassword && (
            <p style={{ color: "red", fontSize: "14px", marginLeft: "40px" }}>
              Make sure your passwords match
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            value={password.confirmedNewPassword}
            placeholder="Confirm your new Password"
            name="confirmedNewPassword"
            className="costumPasswordInput"
            onChange={passwordChange}
          />
          {errors.unMatchedPassword && (
            <p style={{ color: "red", fontSize: "14px", marginLeft: "40px" }}>
              Make sure your passwords match
            </p>
          )}
        </div>
      </form>

      <div>
        <button className="confirm-button" onClick={handlePassword}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
