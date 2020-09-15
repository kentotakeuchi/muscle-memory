import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './MainNavigation.scss';
import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import Copyright from '../Copyright/Copyright';
import Logo from '../Logo/Logo';
import { useSideDrawer } from '../../../hooks/side-drawer-hook';
import { ScrollDownHideUpShow } from '../../../util/scrollDownHideUpShow';

// TODO: type
const MainNavigation: React.FunctionComponent<RouteComponentProps> | any = (
  props: any
): JSX.Element => {
  // CUSTOM HOOK
  const {
    drawerIsOpen,
    openDrawerHandler,
    closeDrawerHandler,
  } = useSideDrawer();

  // UTILITY
  const { isShow } = ScrollDownHideUpShow();

  // RETURN JSX
  return (
    <React.Fragment>
      <SideDrawer
        show={drawerIsOpen}
        onCancel={closeDrawerHandler}
        onClick={closeDrawerHandler}
      >
        <Logo fontSize={5} />
        <nav className="side-drawer__nav">
          <NavLinks className="nav-links--side-drawer" />
        </nav>
        <Copyright fontSize={1.2} />
      </SideDrawer>

      <MainHeader className="main-header">
        {isShow && (
          <React.Fragment>
            <HamburgerIcon onClick={openDrawerHandler} isOpen={drawerIsOpen} />
          </React.Fragment>
        )}
      </MainHeader>

      <main className="main-navigation__main">{props.children}</main>
    </React.Fragment>
  );
};

export default MainNavigation;
