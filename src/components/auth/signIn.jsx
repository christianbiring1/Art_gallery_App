import React from 'react';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Joi from 'joi-browser';
import Input from '../common/Input';
import Form from '../common/Form';

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
    const { email, password } = this.state.data;
    console.log(email, password);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(this.state.errors);
        console.log(errorMessage);
      })
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
        </form>
      </div>
    );
  }
}

export default SignInForm;