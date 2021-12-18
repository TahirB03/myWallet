import React from "react";
import { Link } from "react-router-dom";
import ProfileNavbar from '../components/ProfileNavbar';
import { Auth } from "aws-amplify";
import Password from '../images/Password.png';
import Info from '../images/Info.png';
import Privacy from '../images/Privacy policy.png';
import Currency from '../images/Currency.png';


import "./profile.css";

const signOut = async (e) => {
  e.preventDefault();
  await Auth.signOut();
  window.location.reload();
};


const Profile = () => {
  return (
    <div>
      <ProfileNavbar />
      <p className='settings'>Settings</p>
      <div>
        <button className='currency'>
          <img
            className='currency-logo'
            width={30}
            height={30}
            src={Currency}
            alt='Currency'
          />
          Change currency
        </button>
        <Link style={{ textDecoration: 'none' }} to='/changePassword'>
          <button className='password'>
            <img
              className='password-logo'
              width={30}
              height={30}
              src={Password}
              alt='Password'
            />
            Change password
          </button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/about'>
          <button className='about-us'>
            <img
              className='about-us-logo'
              width={30}
              height={30}
              src={Info}
              alt='about-us'
            />
            About us
          </button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/policy'>
          <button className='policy'>
            <img
              className='policy-logo'
              width={30}
              height={30}
              src={Privacy}
              alt='policy'
            />
            Privacy & Policy
          </button>
        </Link>
        <button className='logOut' onClick={signOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
