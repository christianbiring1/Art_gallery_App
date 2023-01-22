import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Textarea from './textarea';

class Form extends Component {
  // eslint-disable-next-line
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { data } = this.state;
    const result = Joi.validate(data, this.schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (const item of result.error.details) { errors[item.path[0]] = item.message; } // eslint-disable-line
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };  // eslint-disable-line
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data }; // eslint-disable-line
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleFile = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };  // eslint-disable-line
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // Grabbing the Uploadded File (Image)
    const data = { ...this.state.data }; // eslint-disable-line
    data[input.name] = input.files[0];   // eslint-disable-line 
    // If the user try to upload and cancel we don't want to set the state.
    if (input.files[0]) {
      this.setState({ data, errors });
    }
  };

  renderButton(label) {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        errors={errors}
      />
    );
  }

  renderFile(name, label, type) {
    const { data, errors } = this.state; // eslint-disable-line

    return (
      <Input
        type={type}
        name={name}
        // value={data[name].name}
        label={label}
        onChange={this.handleFile}
        errors={errors}
      />
    );
  }

  renderTextarea(name, label) {
    const { data, errors } = this.state;

    return (
      <Textarea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        errors={errors}
      />
    );
  }
}

export default Form;
