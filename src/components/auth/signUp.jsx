import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import Form from '../common/Form';

class SignUpForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
      password_confirm: ''
    },
    errors: {}
  }

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
    password_confirm: Joi.string().required().min(6)
  };


  doSubmit = async () => {
    //  Call the Server 
    const { email, password, password_confirm } = this.state.data;
    if (password !== password_confirm) {
      const errors = { ...this.state.errors };
      errors.password_confirm = 'The password should match';
      this.setState({ errors });
      return;
    };
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  }

  render() {
    const { data, errors } = this.state;

    return (
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <h1>Sign up Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              autoFocus
              type="email"
              className='form-control'
              id='email'
              name='email'
              value={data.email}
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
              value={data.password}
              onChange={this.handleChange}
            />
            {errors['password'] && <div className='alert alert-danger'>{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              className='form-control'
              id='password_confirmation'
              name='password_confirm'
              value={data.password_confirm}
              onChange={this.handleChange}
            />
            {errors['password_confirm'] && <div className='alert alert-danger'>{errors.password_confirm}</div>}
          </div>
          <button
            type="submit"
            className='btn btn-primary'
            disabled={this.validate()}
          >
            Sign Up
          </button>
          <div className='form-group'>
            Already have an account? <Link to="/sign_in">Sign In</Link></div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;