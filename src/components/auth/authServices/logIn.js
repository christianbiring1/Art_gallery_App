import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase-config';

export default function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
