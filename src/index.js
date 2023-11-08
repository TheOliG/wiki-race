import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Static
import NavBar from './components/navbar/Navbar';

// Auth
import { AuthContextProvider } from './context/authContext';
import { auth } from './firestoreInstance/firestoreInstance';

// Routes
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/authentication/LoginPage';
import SignUpPage from './pages/authentication/SignUpPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/'>
            <Route index element={<HomePage/>}/>
            
            <Route path="login" element={auth.currentUser === null ? <LoginPage/> : <Navigate replace to={'/'}/>}/>
            <Route path="signup" element={<SignUpPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
