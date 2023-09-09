// src/components/PostList.js
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import Fuse from "fuse.js";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch posts on the first page load
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
    // Fetch comments for the selected post (if not already fetched)
    if (!comments.length) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Create a new Fuse instance with the posts data
    const fuse = new Fuse(posts, {
      keys: ["title", "body"],
      includeScore: true,
      threshold: 0.4,
    });

    // Perform the search
    const results = fuse.search(newSearchTerm);

    // Extract the item property from the results
    const searchResults = results.map((result) => result.item);

    setSearchResults(searchResults);
  };

  return (
    <div>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />

      {searchResults.map((post) => (
        <Card key={post.id} onClick={() => handlePostClick(post)} style={{ cursor: "pointer", marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
          </CardContent>
        </Card>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <List>
          <ListItem>
            <ListItemText primary="Post Details" secondary={`Title: ${selectedPost?.title}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Comments" />
          </ListItem>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.name} secondary={comment.body} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default PostList;
