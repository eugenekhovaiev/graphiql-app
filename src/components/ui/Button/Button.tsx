import React from 'react';
import styles from './button.module.scss';

interface Props {
  title: string;
  styleType?: 'secondary' | 'long';
  callback?: () => void;
  isSubmit?: boolean;
}

function Button({
  styleType,
  title,
  callback,
  isSubmit = false,
}: Props): JSX.Element {
  return (
    <button
      className={`
      ${styles.button}
      ${styleType === 'secondary' && styles.button_secondary}
      ${styleType === 'long' && styles.button_long}
      `}
      type={isSubmit ? 'submit' : undefined}
      onClick={callback}
    >
      {title}
    </button>
  );
}

export default Button;
