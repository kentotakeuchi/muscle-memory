import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.scss';
import { AuthContext } from '../../../context/auth-context';

interface props {
  className?: string;
}

const NavLinks = ({ className }: props): JSX.Element => {
  const auth = useContext(AuthContext);

  return (
    <ul className={`nav-links ${className}`}>
      <React.Fragment>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/play">play</NavLink>
        </li>
        <li>
          <NavLink to="/stock">stock</NavLink>
        </li>
        <li>
          <button className="nav-links__logout-btn" onClick={auth.logout}>
            logout
          </button>
        </li>
      </React.Fragment>
    </ul>
  );
};

export default NavLinks;
