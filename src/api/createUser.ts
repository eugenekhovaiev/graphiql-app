import { AuthFormProps } from '@/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import loginUser from '@/api/loginUser';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';

function createUser({
  data,
  setSuccessMessage,
  setErrorMessage,
}: AuthFormProps): Promise<string> {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setSuccessMessage && setSuccessMessage(NOTIFICATION.SIGNUP_SUCCESS);
        loginUser({ data, setErrorMessage });
        resolve(RESPONSE_STATUS.SUCCESS);
      })
      .catch((error) => {
        error.code === ERROR_CODES.USER_ALREADY_EXISTS &&
          setErrorMessage(NOTIFICATION.USER_ALREADY_EXISTS);
        reject(RESPONSE_STATUS.FAIL);
      })
      .catch((e) => {
        console.error(e);
        reject(RESPONSE_STATUS.FAIL);
      });
  });
}

export default createUser;
