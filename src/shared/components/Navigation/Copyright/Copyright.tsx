import React from 'react';

import './Copyright.scss';

// TODO: type
const Copyright = ({ className }: any) => {
  return (
    <small
      className={`copyright ${className}`}
    >{`© ${new Date().getFullYear()} kento takeuchi`}</small>
  );
};

export default Copyright;
