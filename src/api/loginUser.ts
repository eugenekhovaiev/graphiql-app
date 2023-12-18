import { AuthFormData } from '@/types';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';

function loginUser({ email, password }: AuthFormData): void {
  try {
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password);
    });
  } catch (e) {
    console.error(e);
  }
}

export default loginUser;
