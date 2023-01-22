/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, projectStore } from '../firebase-config';
import Joi from 'joi-browser';
import Form from './common/Form';
import { ref } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

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
    file: Joi.required().label('Image')
  };

  doSubmit = async () => {
    // Post to the server
    const { title, file, textarea } = this.state.data;
    const author = {
      name: `@${(auth.currentUser.email).slice(0, 3)}`,
      id: auth.currentUser.uid,
    };
    const posts = collection(db, "posts");
    // console.log(FileUpload(file));




    const types = ['image/png', 'image/jpeg', 'image/jpg', '.gif'];
    if (types.includes(!file.type)) {
      console.log('Wrong file');
      return
    };


    try {
      const imageRef = ref(projectStore, `images/${file.name}`);
      uploadBytes(imageRef, file).then(async () => {
        const url = await getDownloadURL(imageRef);
        console.log(url);
        await addDoc(posts, {
          title,
          url,
          textarea,
          author
        });
        window.location = "/";
      })
    } catch (error) {
      const errorCode = error.code;
      console.log(error);
      const errors = { ...this.state.errors };
      errors.file = errorCode;
      this.setState({ errors });
    }
  };
  // Redirect uaser to log In page if not logged In.
  componentDidMount() {
    const isAuth = localStorage.getItem("token");
    if (!isAuth) {
      this.props.history.push('/sign_in');
    }
  }

  render() {
    const { file } = this.state.data;
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Create an Item</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderFile('file', 'Photo', 'file')}
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
