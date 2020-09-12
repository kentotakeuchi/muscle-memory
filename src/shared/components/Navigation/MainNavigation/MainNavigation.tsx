import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './MainNavigation.scss';
import AddButton from '../../UIElements/AddButton/AddButton';
import Modal from '../../UIElements/Modal/Modal';
import ErrorModal from '../../UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../UIElements/LoadingSpinner/LoadingSpinner';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import Copyright from '../Copyright/Copyright';
import Logo from '../Logo/Logo';
import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/http-hook';
import { useForm } from '../../../hooks/form-hook';
import { ScrollDownHideUpShow } from '../../../util/scrollDownHideUpShow';
import { VALIDATOR_REQUIRE } from '../../../util/validators';

const COLORS = [
  { value: 'magenta' },
  { value: 'yellow' },
  { value: 'lime' },
  { value: 'cyan' },
];

// TODO: type
const MainNavigation: React.FunctionComponent<RouteComponentProps> | any = (
  props: any
): JSX.Element => {
  // GLOBAL
  const auth = useContext(AuthContext);
  const { token } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputChangeHandler] = useForm(
    {
      if: {
        value: '',
        isValid: false,
      },
      then: {
        value: '',
        isValid: false,
      },
      color: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  // LOCAL STATE
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { isShow } = ScrollDownHideUpShow();

  // SIDE DRAWER HANDLER
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  // MODAL HANDLER
  const openModalHandler = (): void => {
    setModalIsOpen(true);
  };
  const closeModalHandler = (): void => {
    setModalIsOpen(false);
  };

  //TODO: HOW TO RE-RENDER AFTER POST
  // POST STOCK
  const stockSubmitHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    closeModalHandler();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stocks`,
        'POST',
        JSON.stringify({
          if: formState.inputs.if.value,
          then: formState.inputs.then.value,
          color: formState.inputs.color.value,
        }),
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }
      );

      alert('saved 😉');
    } catch (err) {}
  };

  // JSX
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
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

      <Modal
        show={modalIsOpen}
        onCancel={closeModalHandler}
        onSubmit={stockSubmitHandler}
        header="create"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeModalHandler}>
              cancel
            </Button>
            <Button onClick={stockSubmitHandler}>save</Button>
          </React.Fragment>
        }
      >
        <Input
          element="input"
          id="if"
          type="text"
          placeholder="Please enter for front side"
          label="front"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text."
          onInput={inputChangeHandler}
        />
        <Input
          element="input"
          id="then"
          type="text"
          placeholder="Please enter for back side"
          label="back"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text."
          onInput={inputChangeHandler}
        />
        <div className="modal__radio-wrapper">
          {COLORS.map((c) => (
            <Input
              key={c.value}
              element="radio"
              value={c.value}
              id="color"
              label=""
              name="color"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please select a color"
              onInput={inputChangeHandler}
            />
          ))}
        </div>
      </Modal>

      <MainHeader className="main-header">
        {isShow && (
          <React.Fragment>
            <HamburgerIcon onClick={openDrawerHandler} isOpen={drawerIsOpen} />
            <AddButton onClick={openModalHandler} />
          </React.Fragment>
        )}
      </MainHeader>

      <main className="main-navigation__main">{props.children}</main>
    </React.Fragment>
  );
};

export default MainNavigation;
