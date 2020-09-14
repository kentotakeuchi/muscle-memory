import React from 'react';

import './ResetPage.scss';
import ResetForm from '../components/ResetForm/ResetForm';

const ResetPage = () => {
  return (
    <div className="reset-page">
      <div className="reset-page__wrapper">
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPage;
