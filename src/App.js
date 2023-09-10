import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PostCard from './components/PostCard';
import CommentsDialog from './components/CommentsDialog';
import ResetButtons from './components/ResetButtons';

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
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <ResetButtons resetState={resetState} resetCount={resetCount} />
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
