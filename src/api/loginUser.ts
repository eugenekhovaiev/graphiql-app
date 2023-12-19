import { AuthFormProps } from '@/types';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import NOTIFICATION_MESSAGES from '@/consts/NOTIFICATION_MESSAGES';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';

function loginUser({
  data,
  setSuccessMessage,
  setErrorMessage,
}: AuthFormProps): void {
  try {
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, data.email, data.password).then(
        function () {
          setSuccessMessage &&
            setSuccessMessage(NOTIFICATION_MESSAGES.LOGIN_SUCCESS);
        },
        function (error) {
          error.code === ERROR_CODES.USER_DOESNT_EXIST &&
            setErrorMessage(NOTIFICATION_MESSAGES.USER_DOESNT_EXIST);
        }
      );
    });
  } catch (e) {
    console.error(e);
  }
}

export default loginUser;
