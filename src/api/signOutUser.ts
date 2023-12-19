import { signOut } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import NOTIFICATION_MESSAGES from '@/consts/NOTIFICATION_MESSAGES';

function signOutUser(
  setSuccessMessage: (successMessage: string | null) => void
): void {
  try {
    signOut(auth);
    setSuccessMessage(NOTIFICATION_MESSAGES.LOGOUT_SUCCESS);
  } catch (e) {
    console.error(e);
  }
}

export default signOutUser;
