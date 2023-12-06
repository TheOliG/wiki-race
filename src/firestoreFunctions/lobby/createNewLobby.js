import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firestoreInstance/firestoreInstance";

// Will Return The New Lobby Doc Refrence. 
// Will Throw Error If Insufficent Permissions.
export async function createNewLobby(data){
  const lobbyCollectionRef = collection(db, 'lobbyRequests');

  const newLobbyRef = await addDoc(lobbyCollectionRef, data);

  return newLobbyRef;
}