import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firestoreInstance/firestoreInstance";

export async function requestToJoinLobby(lobbyID){
  if(auth.currentUser !== null){
    await setDoc(doc(db, `activeLobbies/${lobbyID}/players/${auth.currentUser.uid}`), {
      timeJoined: Date.now(),
      username: auth.currentUser.displayName
    });
  }
  else if(localStorage.getItem('guestID') !== null && localStorage.getItem('guestName') !== null){
    await setDoc(doc(db, `activeLobbies/${lobbyID}/players/${localStorage.getItem('guestID')}`), {
      timeJoined: Date.now(),
      username: localStorage.getItem('guestName')
    });
  }
  else{
    // Create A Guest In The Local Storage
    const nameList = ['Potato', 'Pear', 'Avocado', 'Mango', 'Apple', 'Carrot', 'Cucumber', 'Beetroot', 'Mushroom', 'Banana', 'Apricot'];
    const guestID = generateID(16,'abcdefghijklmnopqrstuvwxyz1234567890');
    const guestName = `Anonomous ${nameList[Math.floor(Math.random()*nameList.length)]}`
    localStorage.setItem('guestID', guestID);
    localStorage.setItem('guestName', guestName);

    await setDoc(doc(db, `activeLobbies/${lobbyID}/players/${guestID}`), {
      timeJoined: Date.now(),
      username: guestName
    });
  }
  return true;
}

function generateID(length, allowedCharacters){
  // ID Generation, Not Very Random But Will Do, Possibility Of Duplication if the ID's are generated in the same milisecond
  let ID = '';
  for(let i = 0; i < length; i++){
    ID += allowedCharacters.charAt(Math.floor(Math.random()*allowedCharacters.length));
  }
  return ID;
}