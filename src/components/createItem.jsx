import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/Form';
// import Input from './common/Input';

class CreatePost extends Form {
  state = {
    data: {
      title: '',
      textarea: '',
      file: '',
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label('Title'),
    textarea: Joi.string().required().min(20).max(500)
      .label('Description'),
    file: Joi.string().required().label('Image'),
  };

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Create an Item</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('file', 'Photo', 'file')}
          {this.renderInput('textarea', 'Image Description', 'textarea')}
          {this.renderButton('Log In')}
          <div className="form-group">
            <Link to="/forget_password">Forget Password?</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
