import React, { FunctionComponent } from 'react';

import './SearchBar.scss';
import Icon from '../Icon/Icon';

interface props {
  placeholder: string;
  onLoad: (
    direction: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
}

const SearchBar: FunctionComponent<props> = ({ placeholder, onLoad }) => {
  return (
    <div className="search-bar">
      <div className="search-bar__search-box">
        <input
          id="search"
          type="search"
          placeholder={placeholder}
          onChange={(e) => onLoad('search', e)}
        />
        <Icon width={32} height={32} id="icon-search" />
      </div>
    </div>
  );
};

export default SearchBar;
