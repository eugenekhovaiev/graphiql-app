'use client';
import styles from './authForm.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormData } from '@/types';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification';
import InputField from '@/components/ui/InputField';
import LinkElement from '@/components/ui/LinkElement';
import LINKS from '@/consts/LINKS';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';
import showNotification from '@/utils/showNotification';
import schema from '@/utils/authFormValidationSchema';
import viewHideIcon from '../../../public/view-hide.svg';
import viewIcon from '../../../public/view.svg';
import { useLanguageContext } from '@/utils/contexts/LangContext';

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
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(schema[language]),
  });
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
            NOTIFICATION[language].SIGNUP_SUCCESS,
            setSuccessMessage,
            undefined,
            router,
            LINKS.EDITOR
          );
        !isSignUp &&
          showNotification(
            NOTIFICATION[language].LOGIN_SUCCESS,
            setSuccessMessage,
            undefined,
            router,
            LINKS.EDITOR
          );
      }
    } catch (e) {
      isSignUp &&
        e === ERROR_CODES.USER_ALREADY_EXISTS &&
        showNotification(
          NOTIFICATION[language].USER_ALREADY_EXISTS,
          setErrorMessage,
          setNotificationLink
        );

      !isSignUp &&
        e === ERROR_CODES.USER_DOESNT_EXIST &&
        showNotification(
          NOTIFICATION[language].USER_DOESNT_EXIST,
          setErrorMessage,
          setNotificationLink
        );

      !isSignUp &&
        e === ERROR_CODES.WRONG_PASSWORD &&
        showNotification(
          NOTIFICATION[language].WRONG_PASSWORD,
          setErrorMessage
        );
    }
  };

  return (
    <div className={styles.form__wrapper}>
      <h1 className={styles.form__title}>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputField
          label={textContent.email.label}
          register={register}
          registeredName="email"
          autoComplete="email"
          placeholder={textContent.email.placeholder}
          hasError={!!errors.email}
          helperText={errors.email?.message}
        />
        <InputField
          label={textContent.password.label}
          type={isPasswordVisible ? 'text' : 'password'}
          register={register}
          registeredName="password"
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          placeholder={textContent.password.placeholder}
          endIcon={isPasswordVisible ? viewIcon : viewHideIcon}
          handleEndIconClick={() => setPasswordVisible(!isPasswordVisible)}
          hasError={!!errors.password}
          helperText={errors.password?.message}
        />
        {isSignUp && (
          <InputField
            label={textContent.confirmPassword.label}
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            register={register}
            registeredName="confirmPassword"
            autoComplete="new-password"
            placeholder={textContent.confirmPassword.placeholder}
            endIcon={isConfirmPasswordVisible ? viewIcon : viewHideIcon}
            handleEndIconClick={() =>
              setConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            hasError={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
        <Button title={title} type="submit" />
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
          hasLink={isNotificationLink}
          linkHref={linkHref && linkHref}
          linkTitle={linkTitle && linkTitle}
        />
      )}
    </div>
  );
}

export default AuthForm;
