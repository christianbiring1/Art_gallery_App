import React, { useState, useEffect } from 'react';
// import PropTpes from 'prop-types';
import { Modal } from 'react-responsive-modal';
import { collection, getDocs } from 'firebase/firestore';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography,
} from '@mui/material'; //eslint-disable-line
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { db } from '../firebase-config';

const Home = ({ user }) => {
  const [postsList, setPostsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const allPosts = collection(db, 'posts');

  const handleOpen = () => {
    if (!user) {
      setIsOpen(!isOpen);
    }
  };

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
                  {post.author.name[1].toUpperCase()}
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
              <Typography className="text-muted">
                Posted by
                { ' ' }
                <span style={{ fontWeight: 'bold' }}>{post.author.name}</span>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon onClick={handleOpen} />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon onClick={handleOpen} />
              </IconButton>
            </CardActions>
          </Card>
        ))}
        <Modal open={isOpen} onClose={handleOpen} center classNames={{ modal: 'custom-modal' }}>
          <p>You need to be logged in to perform this action</p>
        </Modal>
      </div>
    </div>
  );
};


export default Home;
