import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.scss';
import Backdrop from '../../UIElements/Backdrop/Backdrop';

interface props {
  show: boolean;
  onCancel: () => void;
  onClick?: () => void;
}

const SideDrawer: FunctionComponent<props> = ({
  show,
  onCancel,
  onClick,
  children,
}): React.ReactPortal => {
  const content = (
    <React.Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        timeout={300}
        classNames="slide"
        mountOnEnter
        unmountOnExit
      >
        <aside className="side-drawer" onClick={onClick}>
          {children}
        </aside>
      </CSSTransition>
    </React.Fragment>
  );

  // TODO: ok?
  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook') as HTMLElement
  );
};

export default SideDrawer;
