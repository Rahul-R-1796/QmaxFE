import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

function CommentsDialog({ selectedPost, closeDialog }) {
  return (
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
  );
}

export default CommentsDialog;
