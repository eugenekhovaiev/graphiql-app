import React from 'react';
import styles from './button.module.scss';

interface Props {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  styleType?: 'secondary' | 'long' | 'link' | 'light' | '';
  className?: string;
  onClick?: () => void;
}

function Button({
  styleType,
  title,
  className,
  onClick,
  type = 'button',
}: Props): JSX.Element {
  return (
    <button
      className={`${styles.button} ${
        styleType === 'secondary' ? styles.button_secondary : ''
      } ${styleType === 'long' ? styles.button_long : ''} ${
        styleType === 'link' ? styles.button_link : ''
      } ${styleType === 'light' ? styles.button_light : ''} ${className || ''}`}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
