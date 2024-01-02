import React from 'react';
import styles from './button.module.scss';

interface Props {
  title: string;
  styleType?: 'secondary' | 'long' | 'light';
  callback?: () => void;
  type: 'button' | 'submit' | 'reset';
}

function Button({
  styleType,
  title,
  callback,
  type = 'button',
}: Props): JSX.Element {
  return (
    <button
      className={`
      ${styles.button}
      ${styleType === 'secondary' && styles.button_secondary}
      ${styleType === 'long' && styles.button_long}
      ${styleType === 'light' && styles.button_light}
      `}
      type={type}
      onClick={callback}
    >
      {title}
    </button>
  );
}

export default Button;
