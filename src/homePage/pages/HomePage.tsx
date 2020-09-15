import React, { useEffect } from 'react';

import './HomePage.scss';
import AddModal from '../../shared/components/UIElements/AddModal/AddModal';
import AddButton from '../../shared/components/UIElements/AddButton/AddButton';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import Bubble from '../../shared/components/UIElements/Bubble/Bubble';
import { useAPI } from '../../shared/hooks/api-hook';
import { useModal } from '../../shared/hooks/modal-hook';
import { ScrollDownHideUpShow } from '../../shared/util/scrollDownHideUpShow';

// COMPONENT
const HomePage = (): JSX.Element => {
  const {
    isLoading,
    error,
    clearError,
    randomStocks,
    totalRandomStocks,
    fetchRandomMultipleStocks,
    inputChangeHandler,
    postStock,
    quote,
    fetchQuotesAPI,
  } = useAPI();
  const { modalIsOpen, openModalHandler, closeModalHandler } = useModal();

  // UTILITY
  const { isShow } = ScrollDownHideUpShow();

  const stockSubmitHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    closeModalHandler();
    postStock(e);
  };

  useEffect(() => {
    fetchQuotesAPI();
  }, [fetchQuotesAPI]);

  useEffect(() => {
    fetchRandomMultipleStocks();
  }, [totalRandomStocks, fetchRandomMultipleStocks]);

  const stockElements = randomStocks.map((s) => (
    <FlipCard key={s._id} front={s.if} back={s.then} color={s.color} />
  ));

  // RETURN JSX
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && <LoadingSpinner asOverlay />}

      <AddModal
        show={modalIsOpen}
        onCancel={closeModalHandler}
        onSubmit={stockSubmitHandler}
        onInput={inputChangeHandler}
      />

      {isShow && <AddButton onClick={openModalHandler} />}

      <div
        className={`home-page ${
          totalRandomStocks > 0 ? 'layout' : 'home-page__layout'
        }`}
      >
        {totalRandomStocks > 0 ? (
          <div className="home-page__main">{stockElements}</div>
        ) : (
          <div className="home-page__bubble-wrapper">
            <Bubble
              width={30}
              height={15}
              text="Add an item you want to memorize"
            />
            <span role="img" aria-labelledby="emoji">
              😉
            </span>
          </div>
        )}
        <div className="home-page__proverb">
          <p className="home-page__text">{quote ? quote.text : 'hustle!'}</p>
          <p className="home-page__author">
            {quote ? quote.author : 'kento takeuchi'}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
