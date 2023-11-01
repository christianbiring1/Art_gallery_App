import React from 'react';

const Input = ({
  name, label, errors, ...rest  // eslint-disable-line
}) => (
  <div className="form-group mb-3">
    <label htmlFor={name}>{label}</label>
    <br />
    <input
      {...rest}  // eslint-disable-line
      name={name}
      id={name}
      className={name === 'file' ? 'form-control-file' : 'form-control'}
    />
    {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
  </div>
);

export default Input;
