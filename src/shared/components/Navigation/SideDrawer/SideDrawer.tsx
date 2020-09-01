import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.scss';

// TODO: type
const SideDrawer = (props: any): React.ReactPortal => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames="slide"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  // TODO: ok?
  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook') as HTMLElement
  );
};

export default SideDrawer;
