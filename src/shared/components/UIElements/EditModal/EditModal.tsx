import React, { FunctionComponent } from 'react';

import Modal from '../Modal/Modal';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import { VALIDATOR_REQUIRE } from '../../../util/validators';
import { ModalProps } from '../../../types/types';

const COLORS = [
  { value: 'magenta' },
  { value: 'yellow' },
  { value: 'lime' },
  { value: 'cyan' },
];

const EditModal: FunctionComponent<ModalProps> = ({
  show,
  onCancel,
  onSubmit,
  onInput,
  formState,
}) => {
  return (
    <Modal
      show={show}
      onCancel={onCancel}
      onSubmit={onSubmit}
      header="update"
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
        initialValue={formState.inputs.if.value}
        initialValid={formState.inputs.if.isValid}
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
        initialValue={formState.inputs.then.value}
        initialValid={formState.inputs.then.isValid}
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
            initialValue={formState.inputs.color.value}
            initialValid={formState.inputs.color.isValid}
          />
        ))}
      </div>
    </Modal>
  );
};

export default EditModal;
