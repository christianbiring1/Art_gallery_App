import React, { useState, useEffect } from 'react';
import {
  collection, deleteDoc, doc, getDocs,
} from 'firebase/firestore';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { auth, db } from '../firebase-config';

const MyProfile = () => {
  const [postsList, setPostsList] = useState([]);
  // const [expand, setExpand] = useState(false);
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
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };
  const userPosts = postsList.filter((post) => post.author.id === auth.currentUser.uid);
  return (
    <div className="container">
      <h1>My Profile</h1>
      <div className="card-container">
        {userPosts.map((post) => (
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
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
