import React from 'react';

const Textarea = ({
  name, label, errors, ...rest  // eslint-disable-line
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <textarea
      {...rest}  // eslint-disable-line
      name={name}
      required
      id={name}
      className="form-control"
      style={{
        height: '15rem', marginBottom: '2rem', fontSize: '1.6rem', color: '#918ca4',
      }}
    />
    {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
  </div>
);

export default Textarea;
