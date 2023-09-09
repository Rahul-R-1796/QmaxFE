import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

function DeleteButton({ postId }) {
  const handleDelete = () => {
    // Send a DELETE request to delete the post
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        // Handle successful deletion here
        console.log('Post deleted:', response);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteButton;
