import React from 'react';

import './NewPasswordPage.scss';
import NewPasswordForm from '../components/NewPasswordForm/NewPasswordForm';

const NewPasswordPage = () => {
  return (
    <div className="new-password-page">
      <div className="new-password-page__required">
        <span style={{ color: 'red', fontSize: '16px' }}>*</span>
        &nbsp;required
      </div>
      <NewPasswordForm />
    </div>
  );
};

export default NewPasswordPage;
