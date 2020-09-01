import React from 'react';

import './MainFooter.scss';

// TODO: type
const MainFooter = (props: any) => {
  return <footer className={props.className}>{props.children}</footer>;
};

export default MainFooter;
