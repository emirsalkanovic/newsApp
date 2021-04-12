import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = props => {
  const onSerchTermChange = e => {
    let term = e.target.value;
    if (term.trim() === "") {
      props.onSearch(term.trim());
    } else {
      props.onSearch(term);
    }
  };

  return (
    <div className="searchFieldContainer">
      <p className="logo">News</p>
      <div className="searchInputHolder">
        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
        <input
          className="searchField"
          type="text"
          placeholder="Search"
          value={props.searchTerm}
          onChange={term => onSerchTermChange(term)}
        />
      </div>
    </div>
  );
};
