import React, { useContext } from 'react';
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
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

////////////////////////////////////////
const LoginForm = (): JSX.Element => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputChangeHandler] = useForm(
    {
      emailLogin: {
        value: '',
        isValid: false,
      },
      passwordLogin: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const loginSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        'POST',
        JSON.stringify({
          email: formState.inputs.emailLogin.value,
          password: formState.inputs.passwordLogin.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      auth.login(responseData.data.user, responseData.token);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <section className="login-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={loginSubmitHandler} className="login-form__form">
          <Input
            element="input"
            id="emailLogin"
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
            id="passwordLogin"
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
