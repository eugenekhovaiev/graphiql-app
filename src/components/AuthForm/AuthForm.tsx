import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormData } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './authForm.module.scss';
import ContainerLayout from '@/components/ContainerLayout';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification/Notification';
import { useState } from 'react';
import LINKS from '@/consts/LINKS';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';
import InputField from '../InputField/InputField';
import viewHideIcon from '../../../public/view-hide.svg';
import viewIcon from '../../../public/view.svg';
import LinkElement from '../ui/LinkElement';

interface Props {
  isSignUp?: boolean;
  onFormSubmit: (data: AuthFormData) => Promise<string>;
  title: string;
  subtitle: string;
  linkTitle: string;
  linkHref: string;
}

function AuthForm({
  isSignUp = false,
  onFormSubmit,
  title,
  subtitle,
  linkTitle,
  linkHref,
}: Props): JSX.Element {
  const { register, handleSubmit } = useForm<AuthFormData>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmationPasswordVisible, setConfirmationPasswordVisibility] =
    useState(false);

  const handlePasswordVisibility = (): void => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const handleConfirmationPasswordVisibility = (): void => {
    setConfirmationPasswordVisibility(!isConfirmationPasswordVisible);
  };

  const onSubmit: SubmitHandler<AuthFormData> = async (data: AuthFormData) => {
    try {
      const response = await onFormSubmit(data);
      if (response === RESPONSE_STATUS.SUCCESS) {
        isSignUp && setSuccessMessage(NOTIFICATION.SIGNUP_SUCCESS);
        !isSignUp && setSuccessMessage(NOTIFICATION.LOGIN_SUCCESS);
        setTimeout(() => {
          setErrorMessage(null);
          router.push(LINKS.HOME);
        }, 1500);
      }
    } catch (e) {
      console.log(e);
      isSignUp &&
        e === ERROR_CODES.USER_ALREADY_EXISTS &&
        setErrorMessage(NOTIFICATION.USER_ALREADY_EXISTS);
      !isSignUp &&
        e === ERROR_CODES.USER_DOESNT_EXIST &&
        setErrorMessage(NOTIFICATION.USER_DOESNT_EXIST);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  return (
    <ContainerLayout>
      <div className={styles.form__wrapper}>
        <h1 className={styles.form__title}>{title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <InputField
            label="Email"
            type="email"
            register={register}
            registeredName="email"
            placeholder="Email"
          />
          <InputField
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            register={register}
            registeredName="password"
            placeholder="Password"
            endDecorationUrl={isPasswordVisible ? viewIcon : viewHideIcon}
            handleDecorationClick={handlePasswordVisibility}
          />
          {isSignUp && (
            <InputField
              label="Confirm Password"
              type={isConfirmationPasswordVisible ? 'text' : 'password'}
              register={register}
              registeredName="confirmPassword"
              placeholder="Password"
              endDecorationUrl={
                isConfirmationPasswordVisible ? viewIcon : viewHideIcon
              }
              handleDecorationClick={handleConfirmationPasswordVisibility}
            />
          )}
          <Button title={title} isSubmit styleType="long" />
        </form>
        <div className={styles.form__subtitle}>
          {subtitle}
          <LinkElement href={linkHref} title={linkTitle} />
        </div>
        {successMessage && <Notification text={successMessage} />}
        {errorMessage && (
          <Notification
            text={errorMessage}
            isError
            linkHref={linkHref}
            linkTitle={linkTitle}
          />
        )}
      </div>
    </ContainerLayout>
  );
}

export default AuthForm;
