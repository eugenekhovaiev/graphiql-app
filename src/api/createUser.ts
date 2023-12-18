import { AuthFormData } from '@/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import loginUser from '@/api/loginUser';

function createUser({ email, password }: AuthFormData): void {
  try {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      loginUser({ email, password });
    });
  } catch (e) {
    console.error(e);
  }
}

export default createUser;
