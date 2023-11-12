import { Card, CardBody, CardHeader, Col, Row, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import { auth } from '../../firestoreInstance/firestoreInstance';
import { Navigate } from "react-router-dom";


function PersonalProfile(props){
    const { user } = useAuth(); 

    if(auth.currentUser?.uid !== props.user.uid){
        return(
            <Navigate to={'/'}></Navigate>
        )
    }
    else{
        return(
            <div>
                <h1>Welcome Back {user.userName}!</h1>
                <Card className='m-3'>
                    <CardHeader>
                        Your Stats:
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                Games played: {'1'}
                            </Col>
                            <Col>
                                Games won: {'1'}
                            </Col>
                        </Row>
                    </CardBody>
                    
                </Card>
                
                <Card className='m-3'>
                    <CardHeader>
                        Account Details:
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                Username: {user.userName}
                            </Col>
                            <Col>
                                Email: {auth.currentUser.email} {!auth.currentUser.emailVerified ? '(Unverified)' : '(Verified)'}
                            </Col>
                        </Row>
                    </CardBody>
                    
                </Card>
            </div>
        );
    }
    
}

export default PersonalProfile;