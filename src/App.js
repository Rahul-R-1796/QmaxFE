import React, { useState, useEffect } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Load posts from localStorage if available
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

  const handlePostClick = (postId) => {
    // Fetch comments for the selected post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((comments) => {
        setSelectedPost({ postId, comments });
      })
      .catch((error) => console.error(error));
  };

  const closeDialog = () => {
    setSelectedPost(null);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save the application state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  return (
    <div className="App">
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePostClick(post.id)}
              style={{ marginTop: '8px', marginLeft: '8px' }}
            >
              View Comments
            </Button>
          </CardContent>
        </Card>
      ))}
      <Dialog open={selectedPost !== null} onClose={closeDialog}>
        {selectedPost && (
          <div>
            <DialogTitle>Comments</DialogTitle>
            <DialogContent>
              {selectedPost.comments.map((comment) => (
                <div key={comment.id}>
                  <Typography variant="h6">{comment.name}</Typography>
                  <Typography color="text.secondary">{comment.body}</Typography>
                </div>
              ))}
            </DialogContent>
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default App;
