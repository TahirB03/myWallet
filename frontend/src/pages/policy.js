import React from 'react';
import { Link } from 'react-router-dom';
import ProfileNav from '../components/ProfileNavbar';

import './about.css';

const Policy = () => {
  return (
    <div>
      <ProfileNav />
      <p className='settings'>Policy</p>
      <div>
        <div className='button'>
          <Link to='/profile'>
            <button className='back-button '>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Policy;
