import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography,
} from '@mui/material'; //eslint-disable-line
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
      <h1>Gallery Feeds</h1>
      <div className="card-container">
        {postsList.map((post) => (
          <Card key={post.id} sx={{ fontSize: '16px' }}>
            <CardHeader
              avatar={(
                <Avatar sx={{ bgcolor: 'GrayText' }} aria-label="recipe">
                  R
                </Avatar>
              )}
              action={(
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              )}
              title={post.title}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image={post.url}
              alt={`${post.author.name} post`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                { post.textarea }
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
          // <div key={post.id} className="card--wrap">
          //   <div className="card">
          //     <img src={post.url} alt={`${post.author.name} post`} className="card-img" />
          //     <div className="card-body">
          //       <h5 className="card-title">{post.title}</h5>
          //       <p className="card-text">{post.textarea}</p>
          //       <p className="card-text">
          //         <small className="text-muted">
          //           Posted by:
          //           {' '}
          //         </small>
          //         <small className="text-muted" style={{ fontWeight: 'bold' }}>
          //           {post.author.name}
          //         </small>
          //       </p>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
