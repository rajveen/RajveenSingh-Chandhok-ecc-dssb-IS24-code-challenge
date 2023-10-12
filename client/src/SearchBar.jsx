import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchType, searchTerm, onSearch }) => {

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={`Search ${searchType}...`}
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;