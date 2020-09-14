import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './NewPasswordForm.scss';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';

////////////////////////////////////////
const NewPasswordForm = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // TODO: resetToken type
  const resetToken = useParams<any>().resetToken;
  const history = useHistory();

  const [formState, inputChangeHandler] = useForm(
    {
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

  const resetSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/resetPassword/${resetToken}`,
        'PATCH',
        JSON.stringify({
          password: formState.inputs.password.value,
          passwordConfirm: formState.inputs.passwordConfirm.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <section className="new-password-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <header className="new-password-form__head">
          <h1 className="new-password-form__title">Reset your password</h1>
          <p className="new-password-form__instruction">
            Enter a new password.
          </p>
        </header>
        <form onSubmit={resetSubmitHandler} className="new-password-form__form">
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
          <Input
            element="input"
            id="passwordConfirm"
            type="password"
            label="confirm password"
            placeholder="New Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter the same password."
            onInput={inputChangeHandler}
            required
          />
          <Button type="submit" disabled={!formState.isValid} size="medium">
            reset password
          </Button>
        </form>
      </section>
    </React.Fragment>
  );
};

export default NewPasswordForm;
