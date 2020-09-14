import React, { useContext, Fragment } from 'react';

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
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

const SignupForm = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputChangeHandler] = useForm(
    {
      emailSignup: {
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
      passwordSignup: {
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

  const signupSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        'POST',
        JSON.stringify({
          email: formState.inputs.emailSignup.value,
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          password: formState.inputs.passwordSignup.value,
          passwordConfirm: formState.inputs.passwordConfirm.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login(responseData.data.user, responseData.token);
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <section className="signup-form">
        {isLoading && <LoadingSpinner asOverlay />}
        {/* <h1 className="signup-form__title">sign up</h1> */}
        <form onSubmit={signupSubmitHandler} className="signup-form__form">
          <Input
            element="input"
            id="emailSignup"
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
            id="passwordSignup"
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
    </Fragment>
  );
};

export default SignupForm;
