import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, onSearch, onClear }) => {
  const clearInput = () => {
    onChange({ target: { value: "" } });
    onClear && onClear();
  };

  return (
    <div className="searchbar-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter address"
          value={value}
          onChange={onChange}
          className="searchbar-input"
        />
        <FiRotateCcw className="clear-icon" onClick={clearInput} />
      </div>
      <button onClick={onSearch} className="searchbar-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
