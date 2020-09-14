import React from 'react';

import './NewPasswordPage.scss';
import NewPasswordForm from '../components/NewPasswordForm/NewPasswordForm';

const NewPasswordPage = () => {
  return (
    <div className="new-password-page">
      <div className="new-password-page__wrapper">
        <NewPasswordForm />
      </div>
    </div>
  );
};

export default NewPasswordPage;
