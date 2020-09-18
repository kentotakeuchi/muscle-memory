import React from 'react';
import { Link } from 'react-router-dom';

import './LoginForm.scss';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../../../shared/util/validators';
import { useAuthRequest } from '../../../shared/hooks/auth-hook';
import { useForm } from '../../../shared/hooks/form-hook';

////////////////////////////////////////
const LoginForm = (): JSX.Element => {
  const { isLoading, error, clearError, onSubmit } = useAuthRequest();
  const [formState, inputChangeHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <section className="login-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <form
          onSubmit={(e) => onSubmit(formState, 'login', e)}
          className="login-form__form"
        >
          <Input
            element="input"
            id="email"
            type="email"
            label="email"
            placeholder="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputChangeHandler}
            required
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="password"
            placeholder="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputChangeHandler}
            required
          />
          <Button type="submit" disabled={!formState.isValid}>
            login
          </Button>
        </form>
        <Link to="/reset">forgot your password?</Link>
      </section>
    </React.Fragment>
  );
};

export default LoginForm;
