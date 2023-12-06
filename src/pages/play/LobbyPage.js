import { doc, getDoc } from "firebase/firestore";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../firestoreInstance/firestoreInstance";
import { useEffect, useState } from "react";

function LobbyPage(){
  const [loadingPage, setLoadingPage] = useState(true);
  const [lobbyDocData, setLobbyDocData] = useState({});

  const { lobbyID } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('getDoc executed');
    getDoc(doc(db,`lobby/${lobbyID}`)).then((doc)=>{
      if(!doc.exists()){
        navigate('/404');
      }
      else{
        setLobbyDocData(doc.data());
        setLoadingPage(false);
      }
    });
    // If the user isnt logged in then we want to redirect them to the login page
    if(auth.currentUser === null){
      navigate('/login');
    }
    
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