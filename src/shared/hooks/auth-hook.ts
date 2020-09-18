import { useState, useCallback, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/auth-context';
import { UserProps } from '../types/types';

let logoutTimer: ReturnType<typeof setTimeout>;

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );
  const [user, setUser] = useState<UserProps | null>(null);

  const history = useHistory();

  const login = useCallback(
    (currentUser: UserProps, token: string, expirationDate?: Date): void => {
      setToken(token);
      setUser(currentUser);
      const tokenExpirationDate =
        expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 24); // 24d // TODO: IDK WHY "X > 24D" DOES NOT WORK?
      setTokenExpirationDate(tokenExpirationDate);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          user: currentUser,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback((): void => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    localStorage.removeItem('userData');
    history.push('/');
  }, [history]);

  const update = useCallback((updatedUser: UserProps): void => {
    setUser(updatedUser);
    const storedData = JSON.parse(localStorage.getItem('userData') || '{}');

    localStorage.setItem(
      'userData',
      JSON.stringify({
        ...storedData,
        user: updatedUser,
      })
    );
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    } else {
      setToken(null);
      setTokenExpirationDate(null);
      setUser(null);
      localStorage.removeItem('userData');
    }
  }, [login]);

  return { token, login, logout, user, update };
};

export const useAuthRequest = () => {
  const auth = useContext(AuthContext);
  const { login } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // TODO: TYPE
  const onSubmit = async (
    formState: any,
    mode: string,
    e: React.FormEvent<HTMLFormElement>,
    resetToken?: string
  ): Promise<void> => {
    e.preventDefault();

    let method: string = 'POST',
      body: string;
    if (mode === 'login') {
      body = JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });
    } else if (mode === 'signup') {
      body = JSON.stringify({
        email: formState.inputs.email.value,
        firstName: formState.inputs.firstName.value,
        lastName: formState.inputs.lastName.value,
        password: formState.inputs.password.value,
        passwordConfirm: formState.inputs.passwordConfirm.value,
      });
    } else if (mode === 'forgotPassword') {
      body = JSON.stringify({
        email: formState.inputs.email.value,
      });
    } else {
      method = 'PATCH';
      body = JSON.stringify({
        password: formState.inputs.password.value,
        passwordConfirm: formState.inputs.passwordConfirm.value,
      });
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/${mode}${
          resetToken ? `/${resetToken}` : ''
        }`,
        method,
        body,
        {
          'Content-Type': 'application/json',
        }
      );

      login(responseData.data.user, responseData.token);
    } catch (err) {}
  };

  return { isLoading, error, clearError, onSubmit };
};
