import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

interface customProps {
  href?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  children?: string;
  to?: string;
  exact?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  disabled?: boolean;
}

type buttonProps = customProps;

const Button = (props: buttonProps): JSX.Element => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        // exact={props.exact} // TODO: ???
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${
        props.inverse && 'button--inverse'
      } ${props.danger && 'button--danger'}`}
      type={props.type ? props.type : 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
