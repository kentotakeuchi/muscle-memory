import React, { FunctionComponent } from 'react';

import './SearchBar.scss';

interface props {
  loadStocks: (direction: string) => Promise<void>;
}

const SearchBar: FunctionComponent<props> = ({ loadStocks }) => {
  return (
    <div className="search-bar">
      <div className="search-bar__search-box">
        <input
          id="search"
          type="text"
          placeholder="Search.."
          onChange={() => loadStocks('search')}
        />
      </div>
    </div>
  );
};

export default SearchBar;
