import React, { useContext, useEffect, useCallback, useState } from 'react';
import './HomePage.scss';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { StockContext } from '../../shared/context/stock-context';

interface quoteProps {
  text: string;
  author: string;
}

const HomePage = (): JSX.Element => {
  const { stocks } = useContext(StockContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // TODO: type
  const [quote, setQuote] = useState<quoteProps | undefined>(undefined);

  const stockElements = stocks.map((s) => (
    <FlipCard key={s._id} front={s.if} back={s.then} color={s.color} />
  ));

  const fetchQuotesAPI = useCallback(async (): Promise<void> => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_QUOTES_URL}`
      );
      console.log({ responseData });

      const randomIdx = Math.floor(Math.random() * responseData.length);
      console.log({ randomIdx });

      setQuote(responseData[randomIdx]);
    } catch (error) {}
  }, [sendRequest]);

  useEffect(() => {
    fetchQuotesAPI();
  }, [fetchQuotesAPI]);

  return (
    <div className="home-page layout">
      <div className="home-page__main">{stockElements}</div>
      <div className="home-page__proverb">
        <p className="home-page__text">{quote ? quote.text : 'hustle!'}</p>
        <p className="home-page__author">
          {quote ? quote.author : 'kento takeuchi'}
        </p>
      </div>
      {/* <div className="font2">muscle memory</div>
      <div className="font1">muscle memory</div>
      <div className="font3">muscle memory</div>
      <div className="font4">muscle memory</div> */}
    </div>
  );
};

export default HomePage;
