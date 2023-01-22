/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import Joi from 'joi-browser';
import Form from './common/Form';

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

  doSubmit = async () => {
    const { title, file, textarea } = this.state;
    // const post = collection(db, "posts")
    console.log(this.state);
    try {
      // await addDoc(post, { title, file, textarea })
      const author = {
        name: `@${(auth.currentUser.email).slice(0, 3)}`,
        id: auth.currentUser.uid,
      }
      console.log(author);
    } catch (error) {

    }
  };

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Create an Item</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('file', 'Photo', 'file')}
          {this.renderTextarea('textarea', 'Image Description')}
          {this.renderButton('Save')}
          <div className="form-group">
            <Link to="/">See all posts</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
