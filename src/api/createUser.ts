import { AuthFormProps } from '@/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import loginUser from '@/api/loginUser';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';
import NOTIFICATION_MESSAGES from '@/consts/NOTIFICATION_MESSAGES';

function createUser({
  data,
  setSuccessMessage,
  setErrorMessage,
}: AuthFormProps): void {
  try {
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      function () {
        setSuccessMessage &&
          setSuccessMessage(NOTIFICATION_MESSAGES.SIGNUP_SUCCESS);
        loginUser({ data, setErrorMessage });
      },
      function (error) {
        error.code === ERROR_CODES.USER_ALREADY_EXISTS &&
          setErrorMessage(NOTIFICATION_MESSAGES.USER_ALREADY_EXISTS);
      }
    );
  } catch (e) {
    console.error(e);
  }
}

export default createUser;
