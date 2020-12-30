import React, {useState} from "react";
import "../css/search.css";

const Search = ({history}) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <div className="search-box">
      <input
        className="search-txt"
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products"

      />
      <a className="search-btn" href="#" onClick={submitHandler}>
        <i class="fas fa-search"></i>
      </a>
    </div>
  );
};

export default Search;
