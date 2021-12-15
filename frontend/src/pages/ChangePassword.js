import React from 'react';
import { Auth } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import ProfileNav from '../components/ProfileNavbar';
import { Link } from 'react-router-dom';

import './profile.css';

function changePass() {
 Auth.currentAuthenticatedUser()
   .then((user) => {
     return Auth.changePassword(user, 'oldPassword', 'newPassword');
   })
   .then((data) => console.log(data))
   .catch((err) => console.log(err));
}

const ChangePassword = () => {
  return (
    <div>
      <ProfileNav />
      Change Password
      <div className='text'>
        <div className='text-field'>
          <TextField
            id='outlined-basic'
            placeholder='Enter your old Password'
            variant='outlined'
          />
        </div>

        <TextField
          className='text-field'
          id='outlined-basic'
          placeholder='Enter your new Password'
          variant='outlined'
        />
      </div>
      <div className='button'>
        <button className='confirm-button' onClick={changePass}>
          Confirm
        </button>

        <Link to='/profile'>
          <button className='back-button '>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;
