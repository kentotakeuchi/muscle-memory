import React, { useContext, useEffect, useCallback, useState } from 'react';
import './HomePage.scss';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import Bubble from '../../shared/components/UIElements/Bubble/Bubble';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { StockContext } from '../../shared/context/stock-context';

interface quoteProps {
  text: string;
  author: string;
}

const HomePage = (): JSX.Element => {
  const { stocks, totalStocks } = useContext(StockContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [quote, setQuote] = useState<quoteProps | undefined>(undefined);

  const stockElements = stocks.map((s) => (
    <FlipCard key={s._id} front={s.if} back={s.then} color={s.color} />
  ));

  const fetchQuotesAPI = useCallback(async (): Promise<void> => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_QUOTES_URL}`
      );

      const randomIdx = Math.floor(Math.random() * responseData.length);

      setQuote(responseData[randomIdx]);
    } catch (error) {}
  }, [sendRequest]);

  useEffect(() => {
    fetchQuotesAPI();
  }, [fetchQuotesAPI]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div
        className={`home-page ${
          totalStocks > 0 ? 'layout' : 'home-page__layout'
        }`}
      >
        {stocks.length > 0 ? (
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
