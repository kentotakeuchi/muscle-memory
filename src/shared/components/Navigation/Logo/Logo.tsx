import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

interface props {
  fontSize?: number;
  className?: string;
}

const Logo = ({ fontSize, className }: props): JSX.Element => {
  return (
    <Link to="/" style={{ width: 'max-content', height: 'max-content' }}>
      <h1
        className={`logo ${className}`}
        style={{ fontSize: `${fontSize}rem` }}
      >
        muscle
        <br />
        memory
      </h1>
    </Link>
  );
};

export default Logo;
