import { AuthFormProps } from '@/types';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import NOTIFICATION from '@/consts/NOTIFICATION';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';

function loginUser({
  data,
  setSuccessMessage,
  setErrorMessage,
}: AuthFormProps): Promise<string> {
  return new Promise((resolve, reject) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then(function () {
            setSuccessMessage && setSuccessMessage(NOTIFICATION.LOGIN_SUCCESS);
            resolve(RESPONSE_STATUS.SUCCESS);
          })
          .catch((e) => {
            e.code === ERROR_CODES.USER_DOESNT_EXIST &&
              setErrorMessage(NOTIFICATION.USER_DOESNT_EXIST);
            reject(RESPONSE_STATUS.FAIL);
          });
      })
      .catch((e) => {
        console.error(e);
        reject(RESPONSE_STATUS.FAIL);
      });
  });
}

export default loginUser;
