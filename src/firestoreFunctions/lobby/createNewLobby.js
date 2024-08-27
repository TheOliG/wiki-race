import { addDoc, collection, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firestoreInstance/firestoreInstance";

// Will Return The New Lobby Doc Refrence. 
// Will Throw Error If Insufficent Permissions.
export async function createNewLobby(data, userID){

  //Deletes the previous Document
  //TODO: Delete all nested documents
  await deleteDoc(doc(db, 'activeLobbies', userID))

  const newLobbyRef = await setDoc(doc(db, 'activeLobbies', userID), data);

  return newLobbyRef;
}