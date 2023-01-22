import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

const Logout = () => {
  useEffect(() => {
    signOut(auth).then(() => {
      localStorage.removeItem('token');
      window.location = '/';
    });
  }, []);
  return null;
};

export default Logout;
