import React from 'react';


const Input = ({ name, label, value, onChange, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        type={name}
        className='form-control'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors[name] && <div className='alert alert-danger'>{errors[name]}</div>}
    </div>
  );
}

export default Input;