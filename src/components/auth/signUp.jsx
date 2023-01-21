import React, { Component } from 'react';
import Joi from 'joi-browser';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';

class SignUpForm extends Component {
  state = {
    user: {
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
    const { email, password, password_confirm } = this.state.user;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    if (password !== password_confirm) {
      const errors = { ...this.state.errors };
      errors.password_confirm = 'The password should match';
      this.setState({ errors });
      console.log(errors);
      return;
    };
    //  call the server

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
          <div className="form-group">
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input
              type="password"
              className='form-control'
              id='password_confirmation'
              name='password_confirm'
              value={user.password_confirm}
              onChange={this.handleChange}
            />
            {errors['password_confirm'] && <div className='alert alert-danger'>{errors.password_confirm}</div>}
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

export default SignUpForm;