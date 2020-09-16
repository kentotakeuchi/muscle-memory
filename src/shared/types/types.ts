/**
 * User related types
 */
export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

/**
 * Stock related types
 */
export interface StockProps {
  _id?: string;
  if: string;
  then: string;
  color: string;
}

/**
 * Quote related types
 */
export interface QuoteProps {
  text: string;
  author: string;
}

/**
 * Custom button related types
 */
export interface ButtonProps {
  href?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  to?: string;
  exact?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  disabled?: boolean;
}

/**
 * Modal related types
 */
export interface ModalProps {
  show: boolean;
  onCancel: () => void;
  onSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => any;
  onInput: () => void;
  formState?: any; // TODO: TYPE
}
