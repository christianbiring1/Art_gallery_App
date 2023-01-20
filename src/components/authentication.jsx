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
    console.log(errors);
    if (errors) return;
    console.log('Submitted!')
  }

  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
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
            {errors && <span className='alert alert-danger'>{errors.useremail}</span>}
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
            {errors && <span className='alert alert-danger'>{errors.userpassword}</span>}
          </div>
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;