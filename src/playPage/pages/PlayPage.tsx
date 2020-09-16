import React, { useEffect, FunctionComponent } from 'react';
import { Swipeable, direction } from 'react-deck-swiper';

import './PlayPage.scss';
import Button from '../../shared/components/FormElements/Button/Button';
import Bubble from '../../shared/components/UIElements/Bubble/Bubble';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import { useStock } from '../../shared/hooks/stock-hook';

// TODO: REFACTOR > UNREADABLE..
// COMPONENT
const PlayPage: FunctionComponent = () => {
  const {
    isLoading,
    error,
    clearError,
    randomStocks,
    totalRandomStocks,
    hasStocks,
    fetchRandomMultipleStocks,
    removeOneRandomStock,
  } = useStock();

  // TODO: error > maybe swipe stuff has to be cleaned when unumount
  useEffect(() => {
    fetchRandomMultipleStocks();
  }, [fetchRandomMultipleStocks]);

  const handleOnSwipe = (swipeDirection: direction) => {
    if (swipeDirection === direction.RIGHT) {
      console.log('handle right swipe');
      return;
    }

    if (swipeDirection === direction.LEFT) {
      console.log('handle left swipe');
      return;
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="play-page">
        {hasStocks ? (
          totalRandomStocks > 0 ? (
            <div className="play-page__wrapper">
              <Swipeable
                onSwipe={handleOnSwipe}
                onAfterSwipe={removeOneRandomStock}
              >
                <FlipCard
                  key={randomStocks[0]._id}
                  front={randomStocks[0].if}
                  back={randomStocks[0].then}
                  color={randomStocks[0].color}
                />
              </Swipeable>
              {randomStocks.length > 1 && (
                <FlipCard
                  key={randomStocks[1]._id}
                  front={randomStocks[1].if}
                  back={randomStocks[1].then}
                  color={randomStocks[1].color}
                  zIndex={-1}
                />
              )}
              {randomStocks.length > 2 && (
                <FlipCard
                  key={randomStocks[2]._id}
                  front={randomStocks[2].if}
                  back={randomStocks[2].then}
                  color={randomStocks[2].color}
                  zIndex={-2}
                />
              )}
            </div>
          ) : (
            <div className="play-page__continue-wrapper">
              <div className="play-page__bubble-wrapper">
                <Bubble width={30} height={15} text="ONE MORE?" />
                <span role="img" aria-labelledby="emoji">
                  😏
                </span>
              </div>
              <div className="play-page__btn-wrapper">
                <Button to="/" inverse>
                  no
                </Button>
                <Button onClick={fetchRandomMultipleStocks}>yes</Button>
              </div>
            </div>
          )
        ) : (
          <div className="play-page__bubble-wrapper">
            <Bubble width={30} height={15} text="Add an item to start" />
            <span role="img" aria-labelledby="emoji">
              😉
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PlayPage;
