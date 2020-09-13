import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  FunctionComponent,
} from 'react';
import { Swipeable, direction } from 'react-deck-swiper';

import './PlayPage.scss';
import Button from '../../shared/components/FormElements/Button/Button';
import Bubble from '../../shared/components/UIElements/Bubble/Bubble';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

interface stockProps {
  _id: string;
  if: string;
  then: string;
  color: string;
}

let loadRandomStocks: () => Promise<void>;

// COMPONENT
const PlayPage: FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const { token } = auth;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [stocks, setStocks] = useState<stockProps[]>([]);

  // TODO: error > maybe swipe stuff has to be cleaned when unumount
  useEffect(() => {
    loadRandomStocks();
  }, []);

  loadRandomStocks = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stocks/random-multiple`,
        'GET',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );

      setStocks(responseData.data);
    } catch (err) {}
  }, [sendRequest, token]);

  const remove = () => setStocks((prevStocks) => prevStocks.slice(1));

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
        {stocks.length > 0 ? (
          <div className="play-page__wrapper">
            <Swipeable onSwipe={handleOnSwipe} onAfterSwipe={remove}>
              <FlipCard
                key={stocks[0]._id}
                front={stocks[0].if}
                back={stocks[0].then}
                color={stocks[0].color}
              />
            </Swipeable>
            {stocks.length > 1 && (
              <FlipCard
                key={stocks[1]._id}
                front={stocks[1].if}
                back={stocks[1].then}
                color={stocks[1].color}
                zIndex={-1}
              />
            )}
            {stocks.length > 2 && (
              <FlipCard
                key={stocks[2]._id}
                front={stocks[2].if}
                back={stocks[2].then}
                color={stocks[2].color}
                zIndex={-2}
              />
            )}
          </div>
        ) : (
          <div className="play-page__continue-wrapper">
            <div className="play-page__bubble-wrapper">
              <Bubble width={30} height={15} />
              <span role="img" aria-labelledby="emoji">
                😏
              </span>
            </div>
            <div className="play-page__btn-wrapper">
              <Button to="/" inverse>
                no
              </Button>
              <Button onClick={loadRandomStocks}>yes</Button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PlayPage;
