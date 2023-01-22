/* eslint-disable */
import React from 'react';
import FileUpload from '../hooks/Hookstorage';

const ProgressBar = ({ file }) => {
  const { url, progress } = FileUpload(file);
  console.log(progress, url);
  return (
    <div className="progress">progress</div>
  )
};

export default ProgressBar;
