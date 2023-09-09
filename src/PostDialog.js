import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DialogTitle, DialogContent, Typography } from '@mui/material';

function PostDialog({ postId, onClose }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the post
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  return (
    <>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        {comments.map(comment => (
          <div key={comment.id}>
            <Typography variant="subtitle1">
              <strong>{comment.name}</strong>
            </Typography>
            <Typography variant="body2">{comment.body}</Typography>
            <hr />
          </div>
        ))}
      </DialogContent>
    </>
  );
}

export default PostDialog;
