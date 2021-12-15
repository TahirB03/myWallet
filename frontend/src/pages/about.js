import React from 'react';
import { Link } from 'react-router-dom';
import ProfileNav from '../components/ProfileNavbar';

import './about.css';

const About = () => {
  return (
    <div>
      <ProfileNav />
      <p className='settings'>About Us</p>
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

export default About;
