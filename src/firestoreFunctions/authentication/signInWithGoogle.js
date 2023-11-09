import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../../firestoreInstance/firestoreInstance';
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function signInWithGoogle(){
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);


    const userRef = doc(db, "user", auth.currentUser.uid);
    const userDoc = await getDoc(userRef);

    //If it is a new user
    if(!userDoc.exists()){
        //Creates the user info in the firestore database 
        await setDoc(userRef, {
            userName: auth.currentUser.displayName,
            newUser: true,
        });
    }
}