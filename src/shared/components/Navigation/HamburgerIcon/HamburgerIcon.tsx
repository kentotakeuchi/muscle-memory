import React from 'react';

import './HamburgerIcon.scss';

interface props {
  onClick: () => void;
  isOpen: boolean;
}

// TODO: consider more reusable component..
const HamburgerIcon = ({ onClick, isOpen }: props): JSX.Element => {
  return (
    <button
      className={`hamburger-icon__btn ${isOpen && 'hamburger-icon__btn--open'}`}
      onClick={onClick}
    >
      <span className="hamburger-icon__icon" />
    </button>
  );
};

export default HamburgerIcon;
