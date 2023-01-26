import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const Home = () => {
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
  return (
    <div className="container">
      <h1>Home</h1>
      <div className="card-container">
        {postsList.map((post) => (
          <div key={post.id} className="card--wrap">
            <div className="card">
              <img src={post.url} alt={`${post.author.name} post`} className="card-img" />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.textarea}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Posted by:
                    {' '}
                  </small>
                  <small className="text-muted" style={{ fontWeight: 'bold' }}>
                    {post.author.name}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
