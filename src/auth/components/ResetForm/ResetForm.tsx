import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import './ResetForm.scss';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { VALIDATOR_EMAIL } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

////////////////////////////////////////
const ResetForm = () => {
  // to replace reset form with done message
  const [isSent, setIsSent] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputChangeHandler] = useForm(
    {
      emailReset: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const resetSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/forgotPassword`,
        'POST',
        JSON.stringify({
          email: formState.inputs.emailReset.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );

      setIsSent(true);
      auth.login(responseData.data.admin, responseData.token);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <section className="reset-form">
        {isLoading && <LoadingSpinner asOverlay />}
        <header className="reset-form__head">
          <h1 className="reset-form__title">Forget your password?</h1>
          {!isSent && (
            <p className="reset-form__instruction">
              Enter your email.
              <br />
              We will send you a new password.
            </p>
          )}
        </header>
        {!isSent && (
          <form onSubmit={resetSubmitHandler} className="reset-form__form">
            <Input
              element="input"
              id="emailReset"
              type="email"
              label="email"
              placeholder="Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputChangeHandler}
              required
            />
            <Button type="submit" disabled={!formState.isValid} size="medium">
              reset password
            </Button>
          </form>
        )}
        {!isSent && <Link to="/">Cancel password reset</Link>}
        {isSent && (
          <p className="reset-form__sent">
            We've sent you an email with a link to update your password.
          </p>
        )}
      </section>
    </React.Fragment>
  );
};

export default ResetForm;
