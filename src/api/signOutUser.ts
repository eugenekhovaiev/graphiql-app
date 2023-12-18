import { signOut } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';

function signOutUser(): void {
  try {
    signOut(auth);
  } catch (e) {
    console.error(e);
  }
}

export default signOutUser;
