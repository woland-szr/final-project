import React from 'react';
import { Link } from 'react-router-dom';

import './AdminHeader.css';

export const AdminHeader = () => {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  return (
    <header>
      <div className="header-container">
        <div className="officer">
          {firstName}
          {lastName}
        </div>
        <nav>
          <ul className="menu">
            <li>
              <Link to="/cases">Cases</Link>
            </li>
            <li>
              <Link to="/officers">Officers</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Exit
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
