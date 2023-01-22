// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAv5tEqI1EuJL80nUFMoqgExrTPFh3vvBY',
  authDomain: 'art-gallery-caa2f.firebaseapp.com',
  projectId: 'art-gallery-caa2f',
  storageBucket: 'art-gallery-caa2f.appspot.com',
  messagingSenderId: '951135626745',
  appId: '1:951135626745:web:5a129a20f226a41ce00928',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const projectStore = getStorage(app);
