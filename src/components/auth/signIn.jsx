import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Input from '../common/Input';
import Form from '../common/Form';
import { login } from './authServices/logIn';

class SignInForm extends Form {
  state = {
    data: {
      email: '',
      password: ''
    },
    errors: {}
  }


  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().min(6).label('Password')
  }

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      const { _tokenResponse } = await login(email, password);
      localStorage.setItem("token", _tokenResponse['idToken']);
      window.location = "/";
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errors = { ...this.state.errors };
      errors.email = errorMessage;
      this.setState({ errors });
    }
  }
  render() {
    const { data, errors } = this.state;

    return (
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <h1>Log In Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="email"
            value={data.email}
            label="Email address"
            onChange={this.handleChange}
            errors={errors}
          />
          <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            errors={errors}
          />
          <button
            type="submit"
            className='btn btn-primary'
            disabled={this.validate()}
          >
            Log In
          </button>
          <div className='form-group'>
            <Link to="/forget_password">Forget Password?</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;