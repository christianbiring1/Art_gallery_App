import { auth } from "../../../firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth"

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}