import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { UserContext } from "../../context/UserContext";
import TextField from "@mui/material/TextField";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "./UploadPhoto.css";
import { Button } from "@mui/material";

const UploadPhoto = () => {
  const navigate = useNavigate();
  const inputFile = useRef(null);
  const userDetails = useContext(UserContext);
  const [userCredentials, setUserCredentials] = useState("");
  const [userinformation, setUserInformation] = useState("");
  const [isButtonDisabled, setIsButtonDisabeld] = useState(true);
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState(false);
  const [postUrl, setPostUrl] = useState("");

  const handleImage = async (e) => {
    if (e.target?.files[0]?.type.includes("image")) {
      setFile(e.target.files[0]);
      setErrors(false);

      try {
        const { data } = await axios.get(
          `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/upload/getUploadUrl/${
            e.target.files[0].name.split(".")[1]
          }`
        );
        setPostUrl(data.link);
        setIsButtonDisabeld(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(true);
      setIsButtonDisabeld(true);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(postUrl, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      handleSubmit();
      const user = await Auth.currentAuthenticatedUser();
      const res = await Auth.updateUserAttributes(
        user,
        userCredentials?.attributes
      );
      if (file !== "") {
        const { data } = await axios.post(
          `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/user/updateUser/${userDetails?.user}`,
          {
            image: postUrl.split("?")[0],
          },
          { headers: { Authorization: userDetails?.token } }
        );
      }
      if (res === "SUCCESS") {
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      if (error.message === "Network Error") {
        navigate("/");
      }
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `https://nx1qh9klx1.execute-api.eu-south-1.amazonaws.com/dev/users/getUserById/${userDetails?.user}`,
        { headers: { Authorization: userDetails?.token } }
      );
      setUserInformation(data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getuserCredentials = async () => {
    try {
      const response = await Auth.currentUserInfo();
      setUserCredentials(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    getuserCredentials();
  }, []);
  return (
    <div className="updateWrraper">
      <DashboardNavbar userDetail={userinformation} />
      <div className="userUpdate">
        <div>
          <div className="imageUpload">
            <img
              alt="profile"
              src={userinformation?.image}
              onError={(e) => {
                e.target.onError = null;
                e.target.src =
                  "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Avatar.png";
              }}
              width="100"
              height="100"
            ></img>
            <div className="uploadButton">
              <input
                type="file"
                id="file"
                onChange={handleImage}
                ref={inputFile}
                style={{ display: "none" }}
              />
              <img
                src="https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Photo.png"
                alt=""
                width="25"
                className="photoSymbol"
                onClick={() => {
                  inputFile.current.click();
                }}
              />
            </div>
          </div>
          {errors === true && (
            <p style={{ color: "red", fontSize: "12px" }}>
              Please choose an image
            </p>
          )}
        </div>
        <div className="userCredentialsInput">
          <TextField
            id="basic"
            value={userCredentials?.username}
            name="username"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            value={userCredentials?.attributes?.email || ""}
            variant="outlined"
            onChange={(e) => {
              setIsButtonDisabeld(false);
              setUserCredentials((prevState) => ({
                attributes: {
                  ...prevState.attributes,
                  email: e.target.value,
                },
              }));
            }}
          />
        </div>
        <div className="updateButtonWrapper">
          <Button
            disabled={isButtonDisabled}
            fullWidth
            className="updateButton"
            variant="contained"
            onClick={() => {
              updateUser();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
