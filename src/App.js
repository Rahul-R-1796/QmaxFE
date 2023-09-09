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
  const [deleteCount, setDeleteCount] = useState(0);

  // Load delete count from localStorage on initial load
  useEffect(() => {
    const storedDeleteCount = parseInt(localStorage.getItem('deleteCount'));
    if (!isNaN(storedDeleteCount)) {
      setDeleteCount(storedDeleteCount);
    }
  }, []);

  useEffect(() => {
    // Load posts from localStorage if available
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    const storedSearchTerm = localStorage.getItem('searchTerm');

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

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setDeleteCount((prevCount) => prevCount + 1);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    localStorage.setItem('searchTerm', newSearchTerm);
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

  const resetCount = () => {
    // Reset the delete count to 0
    setDeleteCount(0);
  };

  const resetState = () => {
    // Clear local storage, reset state (except delete count)
    localStorage.removeItem('posts');
    localStorage.removeItem('searchTerm');
    setPosts([]);
    setSearchTerm('');
    setSelectedPost(null);

    // Fetch new data from the API and update state
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        localStorage.setItem('posts', JSON.stringify(data));
      })
      .catch((error) => console.error(error));
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save the application state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // Save the delete count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('deleteCount', deleteCount);
  }, [deleteCount]);

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
      <Button
        variant="contained"
        color="primary"
        onClick={resetState}
        style={{ marginBottom: '16px' }}
      >
        Reset State
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={resetCount}
        style={{ marginBottom: '16px', marginLeft: '16px' }}
      >
        Reset Count
      </Button>
      <div>
        <p>Delete Count: {deleteCount}</p>
      </div>
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
