import React from "react";

const SearchBar = ({ handleChange }) => {
  return (
    <div id="searchaBar">
      <input
        id="searchInput"
        type="text"
        placeholder="Search for a city...(Buffalo, Boston)"
        onChange={handleChange}
      />
      <button id="searchButton">Search </button>
    </div>
  );
};

export default SearchBar;
