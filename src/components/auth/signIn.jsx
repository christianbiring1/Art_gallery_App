import React from 'react';
import { redirect } from 'react-router-dom';
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
      localStorage.setItem('isAuth', true);
      this.props.history.push("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errors = { ...this.state.errors };
      errors.email = errorMessage;
      this.setState({ errors });
    }
    //     console.log(user, 'Is signed In!');
    //     localStorage.setItem("isAuth", true);
    //     this.props.setIsAuth(true);
  }
  render() {
    const { data, errors } = this.state;
    const token = localStorage.getItem("token");

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
        </form>
      </div>
    );
  }
}

export default SignInForm;