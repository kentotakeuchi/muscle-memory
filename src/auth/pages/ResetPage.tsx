import React from 'react';

import './ResetPage.scss';
import ResetForm from '../components/ResetForm/ResetForm';

const ResetPage = () => {
  return (
    <div className="reset-page">
      <div className="reset-page__required">
        <span style={{ color: 'red', fontSize: '16px' }}>*</span>
        &nbsp;required
      </div>
      <ResetForm />
    </div>
  );
};

export default ResetPage;
