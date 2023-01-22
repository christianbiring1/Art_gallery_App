/* eslint-disable */

import React from 'react';
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
      password_confirm: '',
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
    password_confirm: Joi.string().required().min(6),
  };

  doSubmit = async () => {
    //  Call the Server: Register an user account
    const { email, password, password_confirm } = this.state.data;
    if (password !== password_confirm) {
      const errors = { ...this.state.errors };
      errors.password_confirm = 'The password should match';
      this.setState({ errors });
      return;
    }
    try {
      const { _tokenResponse } = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('token', _tokenResponse.idToken);
      window.location = '/';
    } catch (error) {
      const errorCode = error.code;
      const errors = { ...this.state.errors };
      errors.email = errorCode;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Sign up Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email address', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('password_confirm', 'Password Confirmation', 'password')}
          {this.renderButton('Sign Up')}
          <div className="form-group">
            Already have an account?
            {' '}
            <Link to="/sign_in">Log In</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
