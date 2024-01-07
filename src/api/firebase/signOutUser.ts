import { signOut } from 'firebase/auth';
import { auth } from '@/api/firebase/firebaseConfig';
import STATUS_CODES from '@/consts/STATUS_CODES';

function signOutUser(): Promise<string> {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve(STATUS_CODES.SUCCESS);
      })
      .catch(() => {
        reject(STATUS_CODES.FAIL);
      });
  });
}

export default signOutUser;
