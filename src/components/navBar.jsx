import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Art_Gallery</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink
            className="nav-item nav-link active" to="/"> Home </NavLink>
          <NavLink className="nav-item nav-link" to="new"> Create Post </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/sign_in"> Log In </NavLink>
              <NavLink className="nav-item nav-link" to="sign_up"> Register </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">{user.email} </NavLink>
              <NavLink className="nav-item nav-link" to="log_out"> Logout </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;