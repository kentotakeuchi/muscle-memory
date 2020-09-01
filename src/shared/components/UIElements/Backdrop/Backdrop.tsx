import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';

// TODO: type
const Backdrop = (props: any) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook') as HTMLElement // TODO: ok?
  );
};

export default Backdrop;
