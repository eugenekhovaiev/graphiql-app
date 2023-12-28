import { AuthFormData } from '@/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import loginUser from '@/api/loginUser';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import { FirebaseError } from '@firebase/util';

function createUser(data: AuthFormData): Promise<string> {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        loginUser(data);
        resolve(RESPONSE_STATUS.SUCCESS);
      })
      .catch((error: FirebaseError) => {
        reject(error.code);
      });
  });
}

export default createUser;
