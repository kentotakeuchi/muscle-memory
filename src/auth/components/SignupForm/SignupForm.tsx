import React from 'react';

import './SignupForm.scss';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/util/validators';
import { useAuthRequest } from '../../../shared/hooks/auth-hook';
import { useForm } from '../../../shared/hooks/form-hook';

const SignupForm = () => {
  const { isLoading, error, clearError, onSubmit } = useAuthRequest();
  const [formState, inputChangeHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      firstName: {
        value: '',
        isValid: false,
      },
      lastName: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      passwordConfirm: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <section className="signup-form">
        {isLoading && <LoadingSpinner asOverlay />}
        {/* <h1 className="signup-form__title">sign up</h1> */}
        <form
          onSubmit={(e) => onSubmit(formState, 'signup', e)}
          className="signup-form__form"
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
            id="firstName"
            type="text"
            label="first name"
            placeholder="First Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your first name."
            onInput={inputChangeHandler}
            required
          />
          <Input
            element="input"
            id="lastName"
            type="text"
            label="last name"
            placeholder="Last Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your last name."
            onInput={inputChangeHandler}
            required
          />

          <Input
            element="input"
            id="password"
            type="password"
            label="passowrd"
            placeholder="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputChangeHandler}
            required
          />
          <Input
            element="input"
            id="passwordConfirm"
            type="password"
            label="confirm your password"
            placeholder="Confirm Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the same password."
            onInput={inputChangeHandler}
            required
          />
          <Button type="submit" disabled={!formState.isValid}>
            sign up
          </Button>
        </form>
      </section>
    </React.Fragment>
  );
};

export default SignupForm;
