/* eslint-disable */
import { useState, useEffect } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { projectStore } from '../firebase-config';

// const projectStore = firebase.getStorage();

const FileUpload = (file) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // References

    if (!file) return;

    const imageRef = ref(projectStore, `images/${file.name}`);
    uploadBytes(imageRef, file).then(() => {
      console.log('Image Uploaded');
    });
  }, [])

  return { progress, url, error }

}

export default FileUpload;