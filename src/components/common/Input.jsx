import React from 'react';

const Input = ({
  name, label, errors, ...rest  // eslint-disable-line
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      {...rest}  // eslint-disable-line
      name={name}
      id={name}
      className="form-control"
    />
    {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
  </div>
);

export default Input;
