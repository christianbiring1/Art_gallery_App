/* eslint-disable */
import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const projectStore = firebase.storage();

const FileUpload = (file) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // References
    const storageRef = projectStore.ref(file.name);

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (error) => {
      setError(error);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      setUrl(url);
    })
  }, [file])

  return { progress, url, error }

}

export default FileUpload;