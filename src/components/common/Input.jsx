/* eslint-disable */

import React from 'react';

const Input = ({
  name, label, value, onChange, errors,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={name}
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    />
    {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
  </div>
);

export default Input;
