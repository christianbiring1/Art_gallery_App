import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sign_in">Login</Link>
      </li>
      <li>
        <Link to="/sign_up">SignUp</Link>
      </li>
      <li>
        <Link to="/new">Create Post</Link>
      </li>
    </ul>
  );
}

export default NavBar;