// PostCard.js
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));

    if (storedPosts) {
      setPosts(storedPosts);
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          localStorage.setItem('posts', JSON.stringify(data));
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search posts"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredPosts.map((post) => (
        <Card key={post.id} variant="outlined" style={{ margin: '16px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography color="text.secondary">{post.body}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deletePost(post.id)}
              style={{ marginTop: '8px' }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostCard;
