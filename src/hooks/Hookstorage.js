/* eslint-disable */
import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { projectStore } from '../firebase-config';

// const projectStore = firebase.getStorage();

const FileUpload = (file) => {

  if (!file) return;
  // References

  const imageRef = ref(projectStore, `images/${file.name}`);

  let out = '';
  uploadBytes(imageRef, file).then(async () => {
    console.log('Image Uploaded');
    const url = await getDownloadURL(imageRef);
    out = url;
  });

}

export default FileUpload;