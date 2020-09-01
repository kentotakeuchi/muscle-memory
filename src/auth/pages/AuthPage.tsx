import React, { useState } from 'react';

import './AuthPage.scss';
import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';
import Button from '../../shared/components/FormElements/Button/Button';

const AuthPage = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleFormHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page__brand-main">muscle memory</h1>
      <h3 className="auth-page__brand-sub">
        consolidate something into memory through repetition
      </h3>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <Button onClick={toggleFormHandler}>
        {isLogin ? 'create an account?' : 'sign in?'}
      </Button>
    </div>
  );
};

export default AuthPage;
