import React from 'react';
import TextField from '@mui/material/TextField';

function SearchBar({ searchTerm, handleSearchChange }) {
  return (
    <TextField
      label="Search posts"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}

export default SearchBar;
