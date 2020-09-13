import React, { FunctionComponent } from 'react';

import './Bubble.scss';

interface props {
  width: number;
  height: number;
}

const Bubble: FunctionComponent<props> = ({ width, height }) => {
  return (
    <div
      className="bubble"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    >
      one more?
    </div>
  );
};

export default Bubble;
