import React from 'react';
import { TextField } from '@mui/material';

function SearchBar({ setSearchQuery }) {
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      onChange={handleSearchChange}
    />
  );
}

export default SearchBar;
