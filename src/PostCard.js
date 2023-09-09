// PostCard.js
// ... (previous code)

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // ... (previous code)

    // Function to delete a post by ID
    const deletePost = (postId) => {
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return () => {
      // Cleanup any event listeners or intervals if necessary
    };
  }, [posts]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter posts based on the search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {filteredPosts.map((post) => (
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostCard;
