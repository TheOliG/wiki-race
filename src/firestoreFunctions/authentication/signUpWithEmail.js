import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firestoreInstance/firestoreInstance";
import { doc, setDoc } from "firebase/firestore";


export async function signUpWithEmail(email, password, userName) {
    await createUserWithEmailAndPassword(auth, email, password);

    // Creates a new entry in the user collection
    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, {
        userName: userName,
        newUser: true,
    });

    //Updates the display name for the user
    await updateProfile(auth.currentUser, { displayName: userName });
    
    return true;
}