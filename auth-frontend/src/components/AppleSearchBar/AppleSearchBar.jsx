import React from "react";
import './AppleSearchBar.css'

export const AppleSearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value); // Pass the input value to the parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search contact name..."
        className="search-bar__input"
        onChange={handleInputChange} // Trigger the search handler on input change
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="search-bar__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};
