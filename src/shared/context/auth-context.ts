import { createContext } from 'react';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AppContextInterface {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string | null;
  login: (currentUser: IUser, token: string, expirationDate?: Date) => void;
  logout: () => void;
  update: (updatedUser: IUser) => void;
}

export const AuthContext = createContext<AppContextInterface>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  update: () => {},
});
