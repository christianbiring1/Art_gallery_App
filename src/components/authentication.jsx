import React, { Component } from 'react';
import Joi from 'joi-browser';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config';

class LoginForm extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password')
  };

  validate = () => {
    const result = Joi.validate(this.state.user, this.schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details)
      errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    //  call the server

    const { email, password } = this.state.user;
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
          <button
            type="submit"
            className='btn btn-primary'
            disabled={this.validate()}
          >
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;