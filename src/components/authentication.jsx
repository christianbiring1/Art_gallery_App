import React, { Component } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'

class LoginForm extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  }

  validate = () => {
    const errors = {};

    const { user } = this.state;
    if (user.email.trim() === '')
      errors.useremail = 'The email field is required.';
    if (user.password.trim() === '')
      errors.userpassword = 'Password field is required.'

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  }

  validateProperty = input => {
    if (input.name === 'useremail') {
      if (input.value.trim() === '') return 'User email is required!'
    }

    if (input.name === 'userpassword') {
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
            {errors['useremail'] && <div className='alert alert-danger'>{errors.useremail}</div>}
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
            {errors['userpassword'] && <div className='alert alert-danger'>{errors.userpassword}</div>}
          </div>
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;