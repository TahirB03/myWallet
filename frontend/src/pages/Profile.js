import React from "react";
import { Link } from "react-router-dom";
import ProfileNav from "../components/ProfileNavbar";
import { Auth } from "aws-amplify";

import "./profile.css";

const signOut = async (e) => {
  await Auth.signOut();
};

const Profile = () => {
  return (
    <div>
      <ProfileNav />
      <p className='settings'>Settings</p>
      <div>
        <Link to='/changePassword'>
          <button className='password'>🔒 Change Password</button>
        </Link>
        <Link to='/about'>
          <button className='about-us'>ℹ️ About Us</button>
        </Link>
        <Link to='/policy'>
          <button className='policy'>📄 Privacy & Policy</button>
        </Link>
        <button className='logOut' onClick={signOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
