import React from 'react';
import styles from './button.module.scss';

interface IProps {
  type?: 'secondary';
  title: string;
  callback: () => void;
}

function Button({ type, title, callback }: IProps): JSX.Element {
  return (
    <button
      className={`
      ${styles.button}
      ${type === 'secondary' && styles.button_secondary}
      `}
      onClick={callback}
    >
      {title}
    </button>
  );
}

export default Button;
