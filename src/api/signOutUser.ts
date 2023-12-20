import { signOut } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import NOTIFICATION from '@/consts/NOTIFICATION';

function signOutUser(
  setSuccessMessage: (successMessage: string | null) => void
): void {
  try {
    signOut(auth);
    setSuccessMessage(NOTIFICATION.LOGOUT_SUCCESS);
  } catch (e) {
    console.error(e);
  }
}

export default signOutUser;
