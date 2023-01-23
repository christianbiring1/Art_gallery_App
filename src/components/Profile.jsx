/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase-config';


const MyProfile = () => {
  const [postsList, setPostsList] = useState([]);
  const allPosts = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getDocs(allPosts);
      const data = posts.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostsList(data.reverse());
    };

    getPosts();
  }, [allPosts]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc);
  };
  const userPosts = postsList.filter((post) => post.author.id === auth.currentUser.uid);
  return (
    <div className="container">
      <h1>My Profile</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {userPosts.map((post, index) => (
          <div key={post.id} className="centered-content" style={{ gridColumn: `${index + 1} / span 1` }}>
            <div className=" card">
              <img src={post.url} alt="card cap" />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.textarea}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Posted by:
                    {' '}
                  </small>
                  <small className="text-muted" style={{ fontWeight: 'bold' }}>
                    me
                  </small>
                </p>
              </div>
              <button className='btn btn-danger' onClick={() => { deletePost(post.id) }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProfile;