import React, { FunctionComponent } from 'react';

import './Icon.scss';
import sprite from '../../../../asset/svgs/sprite.svg';

interface props {
  width: number;
  height: number;
  id: string;
}

const Icon: FunctionComponent<props> = ({ width, height, id }) => {
  return (
    <svg className="icon" width={width} height={height}>
      <use xlinkHref={sprite + `#${id}`}></use>
    </svg>
  );
};

export default Icon;
