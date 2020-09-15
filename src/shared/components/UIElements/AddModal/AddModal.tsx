import React, { FunctionComponent } from 'react';

import './AddModal.scss';
import Modal from '../Modal/Modal';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import { VALIDATOR_REQUIRE } from '../../../util/validators';

const COLORS = [
  { value: 'magenta' },
  { value: 'yellow' },
  { value: 'lime' },
  { value: 'cyan' },
];

interface props {
  show: boolean;
  onCancel: () => void;
  onSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => any;
  onInput: () => void;
}

const AddModal: FunctionComponent<props> = ({
  show,
  onCancel,
  onSubmit,
  onInput,
}) => {
  return (
    <Modal
      show={show}
      onCancel={onCancel}
      onSubmit={onSubmit}
      header="create"
      footer={
        <React.Fragment>
          <Button inverse onClick={onCancel}>
            cancel
          </Button>
          <Button onClick={onSubmit}>save</Button>
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
        onInput={onInput}
      />
      <Input
        element="input"
        id="then"
        type="text"
        placeholder="Please enter for back side"
        label="back"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid text."
        onInput={onInput}
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
            onInput={onInput}
          />
        ))}
      </div>
    </Modal>
  );
};

export default AddModal;
