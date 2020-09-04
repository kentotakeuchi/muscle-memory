import React from 'react';

import './LoadingSpinner.scss';

interface props {
  asOverlay?: boolean;
}

const LoadingSpinner = ({ asOverlay }: props): JSX.Element => {
  return (
    <div className={`spinner ${asOverlay && 'overlay'}`}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};

export default LoadingSpinner;
