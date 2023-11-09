import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firestoreInstance/firestoreInstance";


export async function logInWithEmail(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
}