import * as yup from 'yup';

const schema = {
  en: yup.object().shape({
    email: yup
      .string()
      .required('Please provide your email')
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please enter a valid email address in the format "username@example.com"'
      ),

    password: yup
      .string()
      .required('Please set a password for access')
      .min(8, 'Password should be at least 8 characters long')
      .matches(/^(?=.*\p{L})/u, 'Password should include at least one letter')
      .matches(/^(?=.*\p{N})/u, 'Password should include at least one digit')
      .matches(
        /^(?=.*[@$!%*#?&])/u,
        'Password should include at least one special character'
      ),

    confirmPassword: yup.string().when({
      is: (exists: string | undefined) => !!exists,
      then: (rule) =>
        rule.test('match', 'Make sure your passwords match', function (value) {
          return this.parent.password === value;
        }),
    }),
  }),
  ru: yup.object().shape({
    email: yup
      .string()
      .required('Пожалуйста, введите email')
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Введите действительный адрес электронной почты в формате «username@example.com».'
      ),

    password: yup
      .string()
      .required('Пожалуйста, установите пароль для доступа')
      .min(8, 'Пароль не должен быть короче 8 символов')
      .matches(/^(?=.*\p{L})/u, 'Пароль должен содержать хотя бы одну букву')
      .matches(/^(?=.*\p{N})/u, 'Пароль должен содержать хотя бы одну цифру')
      .matches(
        /^(?=.*[@$!%*#?&])/u,
        'Пароль должен содержать хотя бы один специальный символ'
      ),

    confirmPassword: yup.string().when({
      is: (exists: string | undefined) => !!exists,
      then: (rule) =>
        rule.test(
          'match',
          'Убедитесь, что Ваши пароли совпадают',
          function (value) {
            return this.parent.password === value;
          }
        ),
    }),
  }),
};

export default schema;
