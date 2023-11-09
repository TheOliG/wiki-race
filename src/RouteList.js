import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/authentication/LoginPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import { useAuth } from "./context/authContext";
import ProfilePage from "./pages/profile/ProfilePage";


function RouteList() {

  const { user } = useAuth();

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage/>}/>
        <Route path="login" element={user === null ? <LoginPage/> : <Navigate replace to={'/'}/>}/>
        <Route path="signup" element={<SignUpPage/>}/>
        <Route path="/profile/">
          <Route exact path=":profileID" element={<ProfilePage/>} />
        </Route>
      </Route>
    </Routes>
      
  );
}

export default RouteList;
