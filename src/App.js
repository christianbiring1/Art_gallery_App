import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navBar';
import SignInForm from './components/auth/signIn';
import SignUpForm from './components/auth/signUp';
import CreatePost from './components/createItem';
import NotFound from './components/ntFound';
import { useState } from 'react';
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/sign_in" element={<SignInForm setIsAuth={setIsAuth} />} />
          <Route path="/sign_up" element={<SignUpForm />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/product" element={<SignUpForm />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
