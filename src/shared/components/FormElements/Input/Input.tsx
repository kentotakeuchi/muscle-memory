import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../util/validators';
import './Input.scss';

// TODO: any --> proper type
const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: action.validators
          ? validate(action.val, action.validators)
          : true,
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

////////////////////////////////////////////
const Input = (props: any) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: props.isTouched || false,
    isValid: props.initialValid || (!props.validators && true) || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event: any) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  let inputElement;
  switch (props.element) {
    case 'input':
      inputElement = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
      break;
    case 'radio':
      inputElement = (
        <div className="radio-wrapper">
          <input
            type={props.element}
            value={props.value}
            onChange={changeHandler}
            onBlur={touchHandler}
            id={props.id}
            name={props.name}
          />
          <span
            className="checkmark"
            style={{ backgroundColor: `${props.value}` }}
          ></span>
        </div>
      );
      break;
    default:
      inputElement = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
  }

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
