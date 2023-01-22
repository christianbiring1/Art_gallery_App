import React from 'react';

const Textarea = ({
  name, label, errors, ...rest  // eslint-disable-line
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <textarea
      {...rest}  // eslint-disable-line
      name={name}
      id={name}
      className="form-control"
    />
    {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
  </div>
);

export default Textarea;
