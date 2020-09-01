import React from 'react';

import './Slider.scss';

// TODO: type
const Slider = ({ className, children }: any) => {
  return <ul className={`slider ${className}`}>{children}</ul>;
};

export default Slider;
