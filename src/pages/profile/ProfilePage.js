import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from '../../firestoreInstance/firestoreInstance';
import { Spinner } from "react-bootstrap";


function ProfilePage() {
  const { profileID } = useParams()
  const { user } = useAuth();


  const [profileData, setProfileData] = useState("");
  const [loading, setLoading] = useState(true);

  const navigator = useNavigate();

  useEffect(() =>{
    const profileUserRef = doc(db, "user", profileID);
    getDoc(profileUserRef).then((profileUserDoc)=>{
      if(profileUserDoc.exists()){
        setProfileData(profileUserDoc.data());
        setLoading(false);
      }
      else{
        navigator("/404");
      }
    }).catch((err)=>{
      console.log(JSON.stringify(err));
      navigator("/");
    })
    
  }, []);
  if(loading)
  return (
    <div>
      {loading ?
        <div className='text-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      :
        <div>
          {profileData.uid === user.uid ?
            <h1>Your Profile {profileData.userName}</h1>
            :
            <h1>{profileData?.userName + "'s "} Profile</h1>
          }
        </div>
      }

    </div>
  );
}

export default ProfilePage;
