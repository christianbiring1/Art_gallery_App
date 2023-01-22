/* eslint-disable */

import React from 'react';

const Textarea = ({
  name, label, errors, ...rest
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <textarea
      {...rest}
      name={name}
      id={name}
      className="form-control"
    />
    {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
  </div>
);

export default Textarea;
