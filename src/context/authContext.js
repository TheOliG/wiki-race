import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firestoreInstance/firestoreInstance";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const authContext = createContext({});

export const useAuth = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // All the arrows are important because it must store a function in a function https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react 
  const [userSnapshotUnsubscriber, setUserSnapshotUnsubscriber] = useState(()=>()=>{return null});


  //This creates a listener that will call every time the user data is changed
  function createUserSnapshot(userID) {
    return onSnapshot(doc(db, "users", userID), async (changedDoc) => {
      const newData = changedDoc.data();
      newData.uid = userID;
      setUser(newData);
    });
  }

  useEffect(() => {
    const unsubscribeAuthChange = onAuthStateChanged(auth, (userInfo) => {
      if (userInfo !== null) {
        //We get the user information and store it in the user state
        // console.log("reloaded");
        getDoc(doc(db, "user", userInfo.uid)).then((userDatabaseInfo) => {
          if (userDatabaseInfo) {
            const setUserData = userDatabaseInfo;
            userDatabaseInfo.uid = userInfo.uid;
            setUser(setUserData);
            //Creating a new snapshot to listen to the new user info
            userSnapshotUnsubscriber();
            setUserSnapshotUnsubscriber(()=>createUserSnapshot(userInfo.uid));
          } else {
            const setUserData = { uid: userInfo.uid };
            setUser(setUserData);
            //Creating a new snapshot to listen to the new user info
            userSnapshotUnsubscriber();
            setUserSnapshotUnsubscriber(createUserSnapshot(userInfo.uid));
          }
        });
      } else {
        userSnapshotUnsubscriber();
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuthChange();
    };
  }, []);

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <authContext.Provider value={{ user, logOut }}>
      {loading ? null : children}
    </authContext.Provider>
  );
};
