import React from 'react';

import { Link } from 'react-router-dom';

import './Home.css';

export const Home = () => {
  return (
    <div className="main">
      <div className="info">
        <h3>Help us find bicycles!</h3>
        If you rented a bike in our company and it was stolen, please fill out the form below. This
        will help us find it faster.
        <br />
        Thank you!
      </div>
      <Link to="/newcase" className="myButton">
        Tell us about your case
      </Link>
      <Link to="/admin" className="myButton admin">
        Officer&apos;s enter
      </Link>
    </div>
  );
};
