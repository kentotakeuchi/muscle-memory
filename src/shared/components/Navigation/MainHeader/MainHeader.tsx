import React from 'react';

import './MainHeader.scss';

// TODO: type
const MainHeader = ({ children, className, style }: any) => {
  return (
    <header className={className} style={{ backgroundColor: style }}>
      {children}
    </header>
  );
};

export default MainHeader;
