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
  endDecorationUrl?: string;
  handleDecorationClick?: () => void;
}

function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  registeredName,
  endDecorationUrl,
  handleDecorationClick,
}: Props<T>): JSX.Element {
  return (
    <div className={styles.inputField}>
      <label htmlFor={registeredName} className={styles.inputField__label}>
        {label}
      </label>
      <div className={styles.inputField__textFieldContainer}>
        <input
          id={registeredName}
          className={styles.inputField__textField}
          type={type || 'text'}
          {...(register && register(registeredName))}
          placeholder={placeholder}
        />
        {endDecorationUrl && (
          <Image
            className={styles.inputField__textFieldIcon}
            src={endDecorationUrl}
            alt="decoration icon"
            onClick={handleDecorationClick}
            tabIndex={0}
          />
        )}
      </div>
    </div>
  );
}

export default InputField;
