import { HTMLInputTypeAttribute } from 'react';
import styles from './inputField.module.scss';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
  label: string;
  placeholder: string;
  registeredName: Path<T>;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<T>;
}

function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  registeredName,
}: Props<T>): JSX.Element {
  return (
    <div className={styles.inputField}>
      <label htmlFor={registeredName} className={styles.inputField__label}>
        {label}
      </label>
      <input
        id={registeredName}
        className={styles.inputField__textField}
        type={type || 'text'}
        {...(register && register(registeredName))}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
