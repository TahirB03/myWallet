import React from 'react';
import { Link } from 'react-router-dom';
import userLogo from './user.png';

import { Auth } from 'aws-amplify';

import "./profile.css";

const signOut = async (e) => {
  e.preventDefault();
  await Auth.signOut();
  window.location.reload();
};

const Profile = () => {
  return (
    <div>
      <div className='userLogo'>
        <img src={userLogo} width='120px' alt='userLogo' />
      </div>
      <div>
        <Link to='/changePassword'>
          <button className='password'>🔒 Change Password</button>
        </Link>
        <button className='logOut' onClick={signOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
