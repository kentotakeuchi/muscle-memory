import React from 'react';

import './Icon.scss';
import sprite from '../../../../asset/images/sprite.svg';

// TODO: type
const Icon = ({
  width,
  height,
  id,
}: {
  width: number;
  height: number;
  id: string;
}) => {
  return (
    <svg className="icon" width={width} height={height}>
      <use xlinkHref={sprite + `#${id}`}></use>
    </svg>
  );
};

export default Icon;
