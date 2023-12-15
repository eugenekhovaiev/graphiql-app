import React from 'react';
import styles from './button.module.scss';

interface Props {
  styleType?: 'secondary';
  title: string;
  callback: () => void;
}

function Button({ styleType, title, callback }: Props): JSX.Element {
  return (
    <button
      className={`
      ${styles.button}
      ${styleType === 'secondary' && styles.button_secondary}
      `}
      onClick={callback}
    >
      {title}
    </button>
  );
}

export default Button;
