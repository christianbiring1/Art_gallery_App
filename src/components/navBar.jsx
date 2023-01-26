import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => (  // eslint-disable-line
  <nav className="nav collapsible">
    <Link className="logo" to="/">Art_Gallery</Link>
    <div className="menu nav__toggler">X</div>
    <ul className="list nav__list collapsible__content">
      <li className="nav__item">
        <NavLink
          to="/"
        >
          {' '}
          Home
          {' '}

        </NavLink>

      </li>
      {!user && (
      <>
        <li className="nav__item">
          <NavLink to="/sign_in"> Log In </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/sign_up"> Register </NavLink>
        </li>
      </>
      )}
      {user && (
      <>
        <li className="nav__item">
          <NavLink to="/profile">
            <span>My Profile</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/posts/new"> Create Post </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/log_out">
            <span className="btn btn-primary">Logout</span>
          </NavLink>
        </li>
      </>
      )}
    </ul>
  </nav>
);

export default NavBar;
