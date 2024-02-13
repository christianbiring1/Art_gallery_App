import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from '../common/Form';
import login from './authServices/logIn';

class SignInForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      const { _tokenResponse } = await login(email, password);
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
        <h1>Log In Form</h1>
        <form onSubmit={this.handleSubmit} className="login">
          {this.renderInput('email', 'Email address', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Log In')}
          <div className="form-group">
            <Link to="/forget_password">Forget Password?</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
