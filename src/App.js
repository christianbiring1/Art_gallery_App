import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Home from './components/home';
import NavBar from './components/navBar';
import SignInForm from './components/auth/signIn';
import SignUpForm from './components/auth/signUp';
import CreatePost from './components/createItem';
import NotFound from './components/ntFound';
import './App.css';
import React from 'react';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
      console.log(user);
    } catch (error) { }
  }, []);
  return (
    <React.Fragment>
      <NavBar user={user} />
      <div className="container">
        <Switch>
          <Route path="/sign_in" component={SignInForm} />
          <Route path="/sign_up" component={SignUpForm} />
          <Route path="/new" component={CreatePost} />
          <Route path="/not_found" component={NotFound} />
          <Route path="/product" component={SignUpForm} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not_found" />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
