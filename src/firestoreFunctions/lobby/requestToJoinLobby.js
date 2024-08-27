import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firestoreInstance/firestoreInstance";

export async function requestToJoinLobby(lobbyID){
  try {
    // Only a logged in user can join, might change later 
    if(auth.currentUser !== null){
      await setDoc(doc(db, `activeLobbies/${lobbyID}/playerRequests/${auth.currentUser.uid}`), {
        timeJoined: Date.now(),
        username: auth.currentUser.displayName
      });
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  
  return true;
}
