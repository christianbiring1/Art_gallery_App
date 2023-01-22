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
      setPostsList(data);
    };

    getPosts();
  }, [allPosts]);
  return (
    <div className="container">
      <h1>Home</h1>
      <div>
        {postsList.map((post) => <div key={post.id}>{post.title}</div>)}
      </div>
    </div>
  );
};

export default Home;
