import React, { Component } from 'react';
import Joi from 'joi-browser';
import { createUserWithEmailAndPassword } from 'firebase/auth'

class LoginForm extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };

  validate = () => {
    const result = Joi.validate(this.state.user, this.schema, { abortEarly: false });
    console.log(result);


    const errors = {};

    const { user } = this.state;
    if (user.email.trim() === '')
      errors.email = 'The email field is required.';
    if (user.password.trim() === '')
      errors.password = 'Password field is required.'

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  }

  validateProperty = input => {
    if (input.name === 'email') {
      if (input.value.trim() === '') return 'User email is required!'
    }

    if (input.name === 'password') {
      if (input.value.trim() === '') return 'Password is required!'
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];


    const user = { ...this.state.user };
    user[input.name] = input.value;

    this.setState({ user, errors });
  }
  render() {
    const { user, errors } = this.state;

    return (
      <React.Fragment>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              autoFocus
              type="email"
              className='form-control'
              id='email'
              name='email'
              value={user.email}
              onChange={this.handleChange}
            />
            {errors['email'] && <div className='alert alert-danger'>{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className='form-control'
              id='password'
              name='password'
              value={user.password}
              onChange={this.handleChange}
            />
            {errors['password'] && <div className='alert alert-danger'>{errors.password}</div>}
          </div>
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;