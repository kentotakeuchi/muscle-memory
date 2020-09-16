import { createContext } from 'react';
import { UserProps } from '../types/types';

interface AppContextInterface {
  isLoggedIn: boolean;
  user: UserProps | null;
  token: string | null;
  login: (currentUser: UserProps, token: string, expirationDate?: Date) => void;
  logout: () => void;
  update: (updatedUser: UserProps) => void;
}

export const AuthContext = createContext<AppContextInterface>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  update: () => {},
});
