import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog } from '@mui/material';
import PostDialog from './PostDialog';
import DeleteButton from './DeleteButton';

function PostCard({ post }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Card className="post-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Button onClick={handleDialogOpen}>View Comments</Button>
        <DeleteButton postId={post.id} />
      </CardContent>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <PostDialog postId={post.id} onClose={handleDialogClose} />
      </Dialog>
    </Card>
  );
}

export default PostCard;
