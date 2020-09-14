import React, { FunctionComponent } from 'react';

import './Bubble.scss';

interface props {
  width: number;
  height: number;
  text: string;
}

const Bubble: FunctionComponent<props> = ({ width, height, text }) => {
  return (
    <div
      className="bubble"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    >
      {text}
    </div>
  );
};

export default Bubble;
