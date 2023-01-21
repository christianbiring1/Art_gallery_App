import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/Form';
import Input from './common/Input';

class CreatePost extends Form {
  state = {
    data: {
      title: '',
      description: '',
      image: '',
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label('Title'),
    description: Joi.string().required().min(20).max(500)
      .label('Description'),
    image: Joi.string().required().label('Image'),
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Create an Item</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            value={data.title}
            label="Title"
            onChange={this.handleChange}
            errors={errors}
          />
          <Input
            name="file"
            value={data.image}
            label="Photo"
            onChange={this.handleChange}
            errors={errors}
          />
          <Input
            name="textarea"
            value={data.description}
            label="Image Description"
            onChange={this.handleChange}
            errors={errors}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Log In
          </button>
          <div className="form-group">
            <Link to="/forget_password">Forget Password?</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
