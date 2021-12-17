import React from 'react';
import { Link } from 'react-router-dom';
import AboutNavbar from '../components/AboutNavbar';

import './about.css';

const About = () => {
  return (
    <div>
      <AboutNavbar />
      <p className='settings'>About us</p>
      <div>
        <p className='text'>
          We are three talented students that like new challenges. We have
          applied for Taleas program at Tegeria company and we got accepted.
          Since then we have been working hard to achieve our goals. <br />
          This app is the first of many goals that we will achieve 💪{' '}
        </p>
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
