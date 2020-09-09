import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './MainNavigation.scss';
import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UIElements/Backdrop/Backdrop';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import Copyright from '../Copyright/Copyright';
import Logo from '../Logo/Logo';
import { ScrollDownHideUpShow } from '../../../util/scrollDownHideUpShow';

// TODO: type
const MainNavigation: React.FunctionComponent<RouteComponentProps> | any = (
  props: any
): JSX.Element => {
  // Local state
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const { isShow } = ScrollDownHideUpShow();

  // Side drawer handler (open & close)
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <Logo fontSize={5} />
        <nav className="side-drawer__nav">
          <NavLinks className="nav-links--side-drawer" />
        </nav>
        <Copyright fontSize={1.2} />
      </SideDrawer>

      <MainHeader className="main-header">
        {isShow && (
          <HamburgerIcon onClick={openDrawerHandler} isOpen={drawerIsOpen} />
        )}
      </MainHeader>

      <main className="main-navigation__main">{props.children}</main>
    </React.Fragment>
  );
};

export default MainNavigation;
