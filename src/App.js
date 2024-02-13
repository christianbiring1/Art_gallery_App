import React, { useEffect, useState } from 'react';
import {
  Route, BrowserRouter, Routes, Navigate,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Home from './components/home';
import NavBar from './components/navBar';
import CreatePost from './components/createItem';
import NotFound from './components/ntFound';
import MyProfile from './components/Profile';
import SignInForm from './components/auth/signIn';
import SignUpForm from './components/auth/signUp';
import ForgetPassword from './components/auth/Forgetpassword';
import Logout from './components/auth/logout';
import 'react-responsive-modal/styles.css';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (error) { } // eslint-disable-line no-empty
  }, []);
  return (
    <>
      <BrowserRouter basename="/">
        <NavBar user={user} />
        <div className="content-wrapper">
          <Routes>
            <Route path="sign_up" element={<SignUpForm />} />
            <Route path="sign_in" element={<SignInForm />} />
            <Route path="forget_password" element={<ForgetPassword />} />
            <Route path="log_out" element={<Logout />} />
            <Route path="posts/new" element={<CreatePost />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="not_found" element={<NotFound />} />
            <Route path="posts" element={<Home user={user} />} />
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="*" element={<Navigate to="/not_found" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
