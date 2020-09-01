import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// TODO: idk what does that mean..
let logoutTimer: ReturnType<typeof setTimeout>;

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );
  const [user, setUser] = useState<IUser | null>(null);

  const history = useHistory();

  const login = useCallback(
    (currentUser: IUser, token: string, expirationDate?: Date): void => {
      setToken(token);
      setUser(currentUser);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // 24h
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

  const update = useCallback((updatedUser: IUser): void => {
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
