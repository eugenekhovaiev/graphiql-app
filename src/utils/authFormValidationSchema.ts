import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Enter a valid email address in the format "username@example.com", with a valid top-level domain (e.g., ".com", ".org").'
    ),

  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*\p{L})/u, 'Password must include at least one letter')
    .matches(/^(?=.*\p{N})/u, 'Password must include at least one digit')
    .matches(
      /^(?=.*[@$!%*#?&])/u,
      'Password must include at least one special character'
    ),

  confirmPassword: yup
    .string()
    .test('match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export default schema;
