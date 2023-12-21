import { HTMLInputTypeAttribute } from 'react';
import styles from './inputField.module.scss';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface Props<T extends FieldValues> {
  label: string;
  placeholder: string;
  registeredName: Path<T>;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<T>;
  endIcon?: string;
  handleEndIconClick?: () => void;
}

function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  registeredName,
  endIcon,
  handleEndIconClick,
}: Props<T>): JSX.Element {
  return (
    <div className={styles.inputField}>
      <label htmlFor={registeredName} className={styles.inputField__label}>
        {label}
      </label>
      <div className={styles.inputField__container}>
        <input
          id={registeredName}
          className={styles.inputField__input}
          type={type || 'text'}
          {...(register && register(registeredName))}
          placeholder={placeholder}
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
    </div>
  );
}

export default InputField;
