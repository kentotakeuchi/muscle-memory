import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.scss';
import { AuthContext } from '../../../context/auth-context';

// TODO: type
const NavLinks = ({ className }: any) => {
  const auth = useContext(AuthContext);

  return (
    <ul className={`nav-links ${className}`}>
      {!auth.isLoggedIn && (
        <React.Fragment>
          <li>
            <NavLink to="/"></NavLink>
          </li>
        </React.Fragment>
      )}
      {auth.user && (
        <React.Fragment>
          <li>
            <NavLink to="/"></NavLink>
          </li>
          <li>
            <button className="nav-links__logout-btn" onClick={auth.logout}>
              logout
            </button>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
