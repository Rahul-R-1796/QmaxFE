// src/App.tsx
import React from 'react';
import { Container, CssBaseline, Typography } from "@mui/material";
import PostList from './components/PostList'; 

function App() {
  return (
    <Container maxWidth="md">
      <CssBaseline /> 
      <Typography variant="h4" align="center" gutterBottom>
        Posts and Comments
      </Typography>
      <PostList /> 
    </Container>
  );
}

export default App;
