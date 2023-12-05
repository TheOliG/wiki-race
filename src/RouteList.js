import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/authentication/LoginPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import { useAuth } from "./context/authContext";
import ProfilePage from "./pages/profile/ProfilePage";
import PlayGamePage from "./pages/play/PlayGamePage";
import CreateLobbyPage from "./pages/play/CreateLobbyPage";
import LobbyPage from "./pages/play/LobbyPage";
import NotFoundPage from "./pages/NotFoundPage";


function RouteList() {

  const { user } = useAuth();

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage/>}/>
        <Route path="login" element={user === null ? <LoginPage/> : <Navigate replace to={'/'}/>}/>
        <Route path="signup" element={<SignUpPage/>}/>
        <Route path="profile/">
          <Route exact path=":profileID" element={<ProfilePage/>} />
        </Route>
        <Route path="play/">
          <Route index element={<PlayGamePage/>}/>
          <Route path="createLobby" element={<CreateLobbyPage/>}/>
          <Route exact path=":lobbyID" element={<LobbyPage/>} />
          <Route path="404" element={<NotFoundPage/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      
    </Routes>
      
  );
}

export default RouteList;
