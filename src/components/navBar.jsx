/*eslint-disable */

import React, { useState } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Box, Avatar, Menu, MenuItem, Divider, Typography, Tooltip,  } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import { PersonAdd } from '@mui/icons-material';
import { Settings } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';

import logo from '../assets/hamburger-menu-96.png';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [redirect, setRedirect] = useState(null);
  const open = Boolean(anchorEl);
  // const history = useHistory()

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path) => () => {
    setAnchorEl(null);
    setRedirect(path);
    // history.push(path);
  };

  if (redirect) {
    // return <Redirect to={redirect} />;
  }

  return (
    <nav className={!isOpen ? "nav collapsible" : " nav collapsible collapsible--expanded"}>
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
              My Profile
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/posts/new">
              <MenuItem>
              <PersonAdd fontSize='small' /> Add Post
              </MenuItem>
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/log_out" className=' btn btn-primary'>
              <Logout  fontSize='small'/> Logout
            </NavLink>
          </li>
          <li className='nav__item'>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose('/profile')}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another Post
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
          </li>
        </>
        )}
      </ul>
    </nav>

  );
};

export default NavBar;
