import React from 'react';
import { Auth } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import ChangePasswordNavbar from '../components/ChangePasswordNavbar';
import { Link } from 'react-router-dom';

import './changePassword.css';

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
      <ChangePasswordNavbar />
      <p className='settings'>Change Password</p>

      <form>
        <div className='form-group'>
          <input
            type='password'
            required={true}
            placeholder='Enter your old Password'
            name='old-password'
          />
        </div>
        <div>
          <input
            type='password'
            required={true}
            placeholder='Enter your new Password'
            name='new-password'
          />
        </div>
        <div>
          <input
            type='password'
            required={true}
            placeholder='Confirm your new Password'
            name='confirm-password'
          />
        </div>
      </form>

      <div>
        <Link to='/profile'>
          <button className='back-button '>Back</button>
        </Link>

        <button className='confirm-button' onClick={changePass}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
