const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.handleLobbyCreation = functions.firestore
  .document('activeLobbies/{docId}')
  .onCreate(async (snapshot, context) => {
    function generateLobbyCode(length, allowedCharacters){
      // Lobby Code Generation, Not Very Random But Will Do
      // TODO: Properly randomise this
      let lobbyCode = '';
      for(let i = 0; i < length; i++){
        lobbyCode += allowedCharacters.charAt(Math.floor(Math.random()*allowedCharacters.length));
      }
      return lobbyCode;
    }
    const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    await snapshot.ref.set({
      lobbyID: generateLobbyCode(5, allowedCharacters),
      timeLobbyCreated: Date.now()
    },{merge: true});

    return true;
  });

