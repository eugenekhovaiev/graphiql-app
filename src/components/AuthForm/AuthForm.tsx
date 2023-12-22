'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormData } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './authForm.module.scss';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification/Notification';
import { useState } from 'react';
import LINKS from '@/consts/LINKS';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';
import showNotification from '@/utils/showNotification';
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
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isNotificationLink, setNotificationLink] = useState<boolean>(false);

  const onSubmit: SubmitHandler<AuthFormData> = async (data: AuthFormData) => {
    try {
      const response = await onFormSubmit(data);
      if (response === RESPONSE_STATUS.SUCCESS) {
        isSignUp &&
          showNotification(
            NOTIFICATION.SIGNUP_SUCCESS,
            setSuccessMessage,
            undefined,
            router,
            LINKS.HOME
          );
        !isSignUp &&
          showNotification(
            NOTIFICATION.LOGIN_SUCCESS,
            setSuccessMessage,
            undefined,
            router,
            LINKS.HOME
          );
      }
    } catch (e) {
      isSignUp &&
        e === ERROR_CODES.USER_ALREADY_EXISTS &&
        showNotification(
          NOTIFICATION.USER_ALREADY_EXISTS,
          setErrorMessage,
          setNotificationLink
        );

      !isSignUp &&
        e === ERROR_CODES.USER_DOESNT_EXIST &&
        showNotification(
          NOTIFICATION.USER_DOESNT_EXIST,
          setErrorMessage,
          setNotificationLink
        );

      !isSignUp &&
        e === ERROR_CODES.WRONG_PASSWORD &&
        showNotification(NOTIFICATION.WRONG_PASSWORD, setErrorMessage);
    }
  };

  return (
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
          endIcon={isPasswordVisible ? viewIcon : viewHideIcon}
          handleEndIconClick={() => setPasswordVisible(!isPasswordVisible)}
        />
        {isSignUp && (
          <InputField
            label="Confirm Password"
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            register={register}
            registeredName="confirmPassword"
            placeholder="Password"
            endIcon={isConfirmPasswordVisible ? viewIcon : viewHideIcon}
            handleEndIconClick={() =>
              setConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
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
          isLink={isNotificationLink}
          linkHref={linkHref && linkHref}
          linkTitle={linkTitle && linkTitle}
        />
      )}
    </div>
  );
}

export default AuthForm;
