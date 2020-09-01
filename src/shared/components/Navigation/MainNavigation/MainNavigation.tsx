import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './MainNavigation.scss';
import MainHeader from '../MainHeader/MainHeader';
import MainFooter from '../MainFooter/MainFooter';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UIElements/Backdrop/Backdrop';
import Copyright from '../Copyright/Copyright';

// TODO: type
const MainNavigation: React.FunctionComponent<RouteComponentProps> | any = (
  props: any
): JSX.Element => {
  console.log({ props });

  const { location } = props;

  // Local state
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  // bg: transparent > scroll down > bg: slightly opaque white
  const scrollEventHandler = useCallback(
    (e) => {
      if (location.pathname === '/') {
        window.scrollY < 1
          ? setBackgroundColor('transparent')
          : setBackgroundColor('rgb(255, 255, 255, .95)');
      }
    },
    [location]
  );

  // Lifecycle
  useEffect(() => {
    if (location.pathname === '/') {
      setBackgroundColor('transparent');
      window.addEventListener('scroll', scrollEventHandler);
    } else {
      setBackgroundColor('rgb(255, 255, 255, .95)');
    }
    return () => window.removeEventListener('scroll', scrollEventHandler);
  }, [location, scrollEventHandler]);

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
        <nav className="side-drawer__nav">
          <NavLinks className="nav-links--side-drawer" />
        </nav>
      </SideDrawer>
      <MainHeader
        className="main-header"
        // style={!mq.matches ? backgroundColor : 'transparent'}
        style={backgroundColor}
      >
        <button className="main-header__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <nav className="main-header__nav">
          <NavLinks className="nav-links--main-header" />
        </nav>
      </MainHeader>

      <main
        className={
          location.pathname !== '/' ? 'main-navigation__main' : undefined
        }
      >
        {props.children}
      </main>

      <MainFooter className="main-footer">
        <nav className="main-footer__nav">
          <NavLinks className="nav-links--main-footer" />
        </nav>
        <div className="main-footer__content--bottom">
          <Copyright className="copyright--main-footer" />
        </div>
      </MainFooter>
    </React.Fragment>
  );
};

export default MainNavigation;
