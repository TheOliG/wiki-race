import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../firestoreInstance/firestoreInstance";

// Will Return The New Lobby Doc Refrence. 
// Will Throw Error If Insufficent Permissions.
export async function createNewLobby(data, userID){

  const newLobbyRef = await setDoc(doc(db, 'activeLobbies', userID), data);

  return newLobbyRef;
}