import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navBar';
import SignInForm from './components/auth/signIn';
import SignUpForm from './components/auth/signUp';
import CreatePost from './components/createItem';
import NotFound from './components/ntFound';
import { useState } from 'react';
import React from 'react';
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <React.Fragment>
      <NavBar />
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
