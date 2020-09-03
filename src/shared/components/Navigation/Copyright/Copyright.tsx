import React from 'react';

import './Copyright.scss';

interface props {
  className?: string;
  fontSize?: number;
}

// TODO: type
const Copyright = ({ className, fontSize }: props): JSX.Element => {
  return (
    <small
      className={`copyright ${className}`}
      style={{ fontSize: `${fontSize}rem` }}
    >{`© ${new Date().getFullYear()} kento takeuchi`}</small>
  );
};

export default Copyright;
