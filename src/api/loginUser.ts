import { AuthFormData } from '@/types';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import { FirebaseError } from '@firebase/util';

function loginUser(data: AuthFormData): Promise<string> {
  return new Promise((resolve, reject) => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then(function () {
            resolve(RESPONSE_STATUS.SUCCESS);
          })
          .catch((e: FirebaseError) => {
            reject(e);
          });
      })
      .catch(() => {
        reject(RESPONSE_STATUS.FAIL);
      });
  });
}

export default loginUser;
