import React from 'react';

import './Paginator.scss';

// TODO: type
const Paginator = function ({
  children,
  onPage,
  lastPage,
  currentPage,
  className,
}: any): any {
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
            onClick={onPage.bind('previous')} // TODO: removed "this"
          >
            <span>«&nbsp;</span>
            prev
          </button>
        )}

        {pageNumberElements}

        {currentPage < lastPage && (
          <button
            className="paginator__control"
            onClick={onPage.bind('next')} // TODO: removed "this"
          >
            next
            <span>&nbsp;»</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
