import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormData, AuthFormProps } from '@/types';
import { useRouter } from 'next/navigation';
import styles from './authForm.module.scss';
import ContainerLayout from '@/components/ContainerLayout';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification/Notification';
import { useState } from 'react';
import LINKS from '@/consts/LINKS';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';

interface Props {
  isSignUp?: boolean;
  onFormSubmit: ({
    data,
    setSuccessMessage,
    setErrorMessage,
  }: AuthFormProps) => Promise<string>;
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

  const onSubmit: SubmitHandler<AuthFormData> = async (data: AuthFormData) => {
    try {
      const response = await onFormSubmit({
        data,
        setSuccessMessage,
        setErrorMessage,
      });
      response === RESPONSE_STATUS.SUCCESS && router.push(LINKS.HOME);
    } catch (e) {}
  };

  return (
    <ContainerLayout>
      <div className={styles.form__wrapper}>
        <h1 className={styles.form__title}>{title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.form__field}>
            <label className={styles.form__label}>Email</label>
            <input
              className={styles.form__input}
              type="email"
              {...register('email')}
              placeholder="Email"
            />
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__label}>Password</label>
            <input
              className={styles.form__input}
              type="password"
              {...register('password')}
              placeholder="Password"
            />
          </div>
          {isSignUp && (
            <div className={styles.form__field}>
              <label className={styles.form__label}>Confirm Password</label>
              <input
                className={styles.form__input}
                type="password"
                {...register('confirmPassword')}
                placeholder="Password"
              />
            </div>
          )}
          <Button title={title} isSubmit styleType="long" />
        </form>
        <div className={styles.form__subtitle}>
          {subtitle}
          <Link href={linkHref}>{linkTitle}</Link>
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
