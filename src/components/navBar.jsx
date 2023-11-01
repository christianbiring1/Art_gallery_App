import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/hamburger-menu-96.png';
/*eslint-disable */

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={isOpen ? "nav collapsible" : " nav collapsible collapsible--expanded"}>
      <Link className="logo" to="/">Art_Gallery</Link>
      <img src={logo} alt="" className="menu nav__toggler" onClick={handleOpen} />
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
};

export default NavBar;
