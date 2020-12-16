import React from "react";
import "../css/search.css";

const Search = () => {
  return (
    <div className="search-box">
      <input
        className="search-txt"
        type="text"
        name=""
        placeholder="Type to Search"
      />
      <a className="search-btn" href="#">
        <i class="fas fa-search"></i>
      </a>
    </div>
  );
};

export default Search;
