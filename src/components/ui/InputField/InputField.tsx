import { HTMLInputTypeAttribute } from 'react';
import styles from './inputField.module.scss';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface Props<T extends FieldValues> {
  label: string;
  placeholder: string;
  registeredName: Path<T>;
  autoComplete: 'on' | 'off' | 'email' | 'new-password' | 'current-password';
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<T>;
  endIcon?: string;
  handleEndIconClick?: () => void;
  hasError?: boolean;
  helperText?: string;
}

function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  registeredName,
  autoComplete,
  endIcon,
  handleEndIconClick,
  hasError,
  helperText,
}: Props<T>): JSX.Element {
  return (
    <div className={styles.inputField}>
      <label htmlFor={registeredName} className={styles.inputField__label}>
        {label}
      </label>
      <div
        className={`${styles.inputField__container} ${
          hasError && styles.inputField__container_error
        }`}
      >
        <input
          id={registeredName}
          className={styles.inputField__input}
          type={type || 'text'}
          {...(register && register(registeredName))}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {endIcon && (
          <Image
            className={styles.inputField__icon}
            src={endIcon}
            alt="decoration icon"
            onClick={handleEndIconClick}
            tabIndex={0}
          />
        )}
      </div>
      {hasError && (
        <p className={styles.inputField__helperText}>{helperText}</p>
      )}
    </div>
  );
}

export default InputField;
