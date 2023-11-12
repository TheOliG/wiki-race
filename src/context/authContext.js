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
  let userSnapshotUnsubscriber = ()=>null;


  //This creates a listener that will call every time the user data is changed
  function createUserSnapshot(userID) {
    return onSnapshot(doc(db, "user", userID), async (changedDoc) => {
      const newData = changedDoc.data();
      console.log(newData);
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
            setUser(userDatabaseInfo);
            //Creating a new snapshot to listen to the new user info
            userSnapshotUnsubscriber();
            // This implementaiton of storing the unsubscriber is realy weird and breaks sometimes, should probably use a different implementation
            // eslint-disable-next-line react-hooks/exhaustive-deps
            userSnapshotUnsubscriber = createUserSnapshot(userInfo.uid);
          } else {
            const setUserData = { uid: userInfo.uid };
            setUser(setUserData);
            //Creating a new snapshot to listen to the new user info
            userSnapshotUnsubscriber();
            userSnapshotUnsubscriber = createUserSnapshot(userInfo.uid);
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
