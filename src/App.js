import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import DeleteButton from './DeleteButton';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if posts are stored in localStorage
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      // If posts are available in localStorage, parse and set them in state
      setPosts(JSON.parse(storedPosts));
      setFilteredPosts(JSON.parse(storedPosts));
    } else {
      // Fetch posts from the API on initial load
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          const fetchedPosts = response.data;
          // Store fetched posts in localStorage
          localStorage.setItem('posts', JSON.stringify(fetchedPosts));
          setPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts);
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    }
  }, []);

  // Handle search query changes and filter posts
  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="post-list">
        {filteredPosts.map(post => (
          <div key={post.id}>
            <PostCard post={post} />
            <DeleteButton postId={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
