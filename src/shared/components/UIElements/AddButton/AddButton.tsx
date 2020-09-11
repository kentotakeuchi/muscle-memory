import React, { FunctionComponent } from 'react';

import './AddButton.scss';

interface props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const AddButton: FunctionComponent<props> = ({ onClick }) => {
  return (
    <button className="add-btn" onClick={onClick}>
      +
    </button>
  );
};

export default AddButton;
