import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navBar';
import SignInForm from './components/auth/signIn';
import SignUpForm from './components/auth/signUp';
import CreatePost from './components/createItem';
function App() {
  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/sign_in" element={<SignInForm />} />
          <Route path="/sign_up" element={<SignUpForm />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/product" element={<SignUpForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
