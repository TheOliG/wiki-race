const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.handleLobbyCreation = functions.firestore
  .document('lobbyRequests/{docId}')
  .onCreate(async (change, context) => {
    function generateLobbyCode(length, allowedCharacters){
      // Lobby Code Generation, Not Very Random But Will Do
      let lobbyCode = '';
      for(let i = 0; i < length; i++){
        lobbyCode += allowedCharacters.charAt(Math.floor(Math.random()*allowedCharacters.length));
      }
      return lobbyCode;
    }
    const allowedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lobbyCode = generateLobbyCode(4, allowedCharacters);
    let acceptedCode = false;
    let attempts = 0;
    const maxAttempts = 5;
    // Loop that generates a lobby code and checks that it doesnt already exist
    while(acceptedCode === false && attempts < maxAttempts){
      const queryResult = await db.collection('activeLobbies').where('lobbyCode', '==', lobbyCode).get();
      if(queryResult.empty){
        acceptedCode = true;
      }
      attempts++;
    }


    if(attempts < maxAttempts){
      db.doc(`activeLobbies/${context.params.docId}`).create({...change.data(), timeLobbyCreated: Date.now(), lobbyCode: lobbyCode});
      change.ref.delete();
    }

    return null;
    
  });

