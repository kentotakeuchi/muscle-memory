import React, { FunctionComponent } from 'react';

import './Paginator.scss';

interface props {
  onPage: (direction: string | number) => void;
  lastPage: number;
  currentPage: number;
  className?: string;
}

const Paginator: FunctionComponent<props> = function ({
  children,
  onPage,
  lastPage,
  currentPage,
  className,
}) {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }
  const pageNumberElements = pageNumbers.map((number) => {
    if (
      number === 1 ||
      number === lastPage ||
      (number >= currentPage - 2 && number <= currentPage + 2)
    ) {
      return (
        <button
          key={number}
          id={number.toString()} // TODO: ok?
          onClick={() => onPage(number)}
          className={`paginator__number ${
            currentPage === number ? 'paginator__number--active' : undefined
          }`}
        >
          {number}
        </button>
      );
    }
    return undefined;
  });

  return (
    <div className={`paginator ${className}`}>
      {children}
      <div className="paginator__control-box">
        {currentPage > 1 && (
          <button
            className="paginator__control"
            onClick={() => onPage('previous')}
          >
            <span>«&nbsp;</span>
            prev
          </button>
        )}

        {pageNumberElements}

        {currentPage < lastPage && (
          <button className="paginator__control" onClick={() => onPage('next')}>
            next
            <span>&nbsp;»</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
