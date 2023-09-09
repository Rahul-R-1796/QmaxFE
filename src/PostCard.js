// PostCard.js
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PostCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Check if posts are already in local storage
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    
    if (storedPosts) {
      setPosts(storedPosts);
    } else {
      // Fetch posts from the API on the first load
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          // Save posts to local storage
          localStorage.setItem('posts', JSON.stringify(data));
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" style={{ margin: '16px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography color="text.secondary">{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostCard;
