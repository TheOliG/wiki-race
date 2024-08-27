import { collection, doc, getDoc, getDocs, query, onSnapshot } from "firebase/firestore";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firestoreInstance/firestoreInstance";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

function LobbyPage(){
  const [loadingPage, setLoadingPage] = useState(true);
  const [lobbyDocData, setLobbyDocData] = useState({});
  const [currentPlayers, setCurrentPlayers] = useState({});
  const [lobbyCode, setLobbyCode] = useState("");
  const { user } = useAuth();

  const { lobbyID } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {

    //Gets the Current Lobby Data
    console.log('getDoc executed');
    getDoc(doc(db,`activeLobbies/${lobbyID}`)).then((doc)=>{
      if(!doc.exists()){
        navigate('/404');
      }
      else{
        setLobbyDocData(doc.data());
        setLoadingPage(false);
      }
    }).catch((err)=>{
      console.log(err);
      navigate('/');
    });

    // Requests to join the lobby
    //if(lobbyID === user.id)
    console.log(user.uid);
    // Gets all current players
    getDocs(query(collection(db, `activeLobbies/${lobbyID}/players`))).then((snap)=>{
      const tempObj = {};
      snap.forEach((doc)=>{
        tempObj[doc.id] = doc.data().username;
      });
      setCurrentPlayers(tempObj);
      console.log(tempObj);
    });


    const unsub = onSnapshot(doc(db,`activeLobbies/${lobbyID}`), (doc) => {
      console.log("Current data: ", doc.data());
      setLobbyDocData(doc.data());
    });

    //This makes sure the listener is unsubscribed on unmount
    return () => {unsub()}
  },[lobbyID, navigate]);


  


  return(
  <Card className='mx-5 my-2 pt-2' data-bs-theme="dark">
    {loadingPage ? 
    <div className='text-center'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
    :
    <div>
      <Card.Title className="text-center">{`${lobbyDocData.startTitle} \u27F6 ${lobbyDocData.targetTitle}`}</Card.Title>
      <Card.Body>
        <Row>
          <Col className="text-center">
            <Card.Text> Starting Page: <br/><a href={lobbyDocData.startURL} target="_blank" rel="noreferrer">{lobbyDocData.startTitle}</a></Card.Text>
          </Col>
          <Col className="text-center">
            <Card.Text> Target Page: <br/><a href={lobbyDocData.targetURL} target="_blank" rel="noreferrer">{lobbyDocData.targetTitle}</a></Card.Text>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Card.Text>Players:</Card.Text>
          </Col>
        </Row>
        <Row>
          {Object.keys(currentPlayers).map((key)=>{
            return(
              <Col className="text-center">
                {currentPlayers[key]}
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col className="text-center">
            <Card.Text>Code:</Card.Text>
            <Card.Text>{lobbyDocData.lobbyID}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Card.Text className="fs-3 fw-bold">{lobbyDocData.lobbyCode}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col className="text-center">
            <Card.Text>Duration: {lobbyDocData.timeLimit} Seconds</Card.Text>
          </Col>
          <Col className="text-center">
            <Card.Text>Maximum Players: {lobbyDocData.maxPlayers}</Card.Text>
          </Col>
        </Row>
      </Card.Footer>
    </div>
    }
    
  </Card>
  );
}

export default LobbyPage;