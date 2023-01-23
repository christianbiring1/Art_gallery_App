import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
    <div className="container">
      <NavBar user={user} />
      <Switch>
        <Route path="/sign_up" component={SignUpForm} />
        <Route path="/sign_in" component={SignInForm} />
        <Route path="/forget_password" component={ForgetPassword} />
        <Route path="/log_out" component={Logout} />
        <Route path="/posts/new" component={CreatePost} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/not_found" component={NotFound} />
        <Route path="/posts" exact component={Home} />
        <Redirect from="/" to="posts" />
        <Redirect to="/not_found" />
      </Switch>
    </div>
  );
}

export default App;
