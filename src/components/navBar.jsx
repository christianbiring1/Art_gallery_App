import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Art_Gallery</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div classNameName="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div classNameName="navbar-nav">
          <NavLink
            className="nav-item nav-link active" to="/"> Home </NavLink>
          <NavLink className="nav-item nav-link" to="/sign_in"> Sign In </NavLink>
          <NavLink className="nav-item nav-link" to="sign_up"> Sign Up </NavLink>
          <NavLink className="nav-item nav-link" to="new"> Create Post </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;