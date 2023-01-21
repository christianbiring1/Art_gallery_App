import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  let handler = '';
  if (user) {
    const { email } = user;
    handler = email.slice(0, 3).toUpperCase();
  }

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
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/sign_in"> Log In </NavLink>
              <NavLink className="nav-item nav-link" to="sign_up"> Register </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                <span>{handler}</span>
              </NavLink>
              <NavLink className="nav-item nav-link" to="new"> Create Post </NavLink>
              <NavLink className="nav-item nav-link" to="log_out"> Logout </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;