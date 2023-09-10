import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function PostCard({ post, deletePost, handlePostClick }) {
  return (
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
  );
}

export default PostCard;
