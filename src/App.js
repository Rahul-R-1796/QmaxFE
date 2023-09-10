import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PostCard from './components/PostCard';
import CommentsDialog from './components/CommentsDialog';
import ResetButtons from './components/ResetButtons';

function App() {
  // State variables
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteCount, setDeleteCount] = useState(0);

  // Load data from localStorage on initial load
  useEffect(() => {
    const storedDeleteCount = parseInt(localStorage.getItem('deleteCount')) || 0;
    setDeleteCount(storedDeleteCount);

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);

    const storedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(storedSearchTerm);
  }, []);

  // Fetch posts from API and store in state
  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        localStorage.setItem('posts', JSON.stringify(data));
      })
      .catch((error) => console.error(error));
  };

  // Delete a post
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setDeleteCount(deleteCount + 1);
  };

  // Fetch comments for a selected post
  const handlePostClick = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((comments) => {
        setSelectedPost({ postId, comments });
      })
      .catch((error) => console.error(error));
  };

  // Close the comments dialog
  const closeDialog = () => {
    setSelectedPost(null);
  };

  // Reset delete count to 0
  const resetCount = () => {
    setDeleteCount(0);
  };

  // Reset state and fetch new data
  const resetState = () => {
    localStorage.removeItem('posts');
    localStorage.removeItem('searchTerm');
    setPosts([]);
    setSearchTerm('');
    setSelectedPost(null);
    resetCount();
    fetchPosts();
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save state changes to localStorage
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('deleteCount', deleteCount);
  }, [posts, searchTerm, deleteCount]);

  return (
    <div className="App">
      <SearchBar searchTerm={searchTerm} handleSearchChange={setSearchTerm} />
      <ResetButtons resetState={resetState} resetCount={resetCount} deleteCount={deleteCount} />
      <div>
        <p>Delete Count: {deleteCount}</p>
      </div>
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          deletePost={deletePost}
          handlePostClick={handlePostClick}
        />
      ))}
      <CommentsDialog selectedPost={selectedPost} closeDialog={closeDialog} />
    </div>
  );
}

export default App;
