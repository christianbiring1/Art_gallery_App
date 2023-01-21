import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import Form from "../common/Form";
import Input from "../common/Input";


class ForgetPassword extends Form {
  state = {
    data: {
      email: '',
    },
    errors: {},
    notification: {}
  }

  schema = {
    email: Joi.string().required().email().label("Email")
  }

  doSubmit = async () => {
    const { email } = this.state.data;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        const notification = { ...this.state.notification };
        notification.message = "Password reset email sent!";
        this.setState({ notification });
        setTimeout(() => {
          this.props.history.push("/");
        }, "5000")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errors = { ...this.state.errors };
        errors.email = errorCode;
        this.setState({ errors });
      });
  }

  render() {
    const { data, errors, notification } = this.state;
    return (
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <h1>Reset Password</h1>
        <form onSubmit={this.handleSubmit}>
          {notification["message"] && <div className='alert alert-success'>{notification["message"]}</div>}
          <Input
            name="email"
            value={data.email}
            label="Email address"
            onChange={this.handleChange}
            errors={errors}
          />
          <button
            type="submit"
            className='btn btn-primary'
            disabled={this.validate()}
          >
            Reset Password
          </button>
          <div className='form-group'>
            Already have an account? <Link to="/sign_in">Log In</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;