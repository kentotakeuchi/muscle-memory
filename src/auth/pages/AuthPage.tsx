import React, { useState } from 'react';

import './AuthPage.scss';
import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';

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
      <div className="auth-page__wrapper">
        <h1 className="auth-page__brand-main">muscle memory</h1>
        <div className="auth-page__form-wrapper">
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
        <button onClick={toggleFormHandler}>
          {isLogin ? 'create an account?' : 'sign in?'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
