import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firestoreInstance/firestoreInstance";

export async function getLobbyFromCode(lobbyCode){
  const q = query(collection(db, 'activeLobbies'), where('lobbyCode', '==', lobbyCode));
  const querySnapshot = await getDocs(q);

  if(querySnapshot.empty){
    return '';
  }
  else{
    return querySnapshot.docs[0].id;
  }
}