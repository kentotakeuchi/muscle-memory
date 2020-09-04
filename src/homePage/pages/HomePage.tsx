import React, { useContext } from 'react';
import './HomePage.scss';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import { StockContext } from '../../shared/context/stock-context';

const HomePage = (): JSX.Element => {
  const { stocks } = useContext(StockContext);

  const stockElements = stocks.map((s) => (
    <FlipCard front={s.if} back={s.then} color={s.color} />
  ));

  return (
    <div className="home-page layout">
      {stockElements}
      {/* <div className="font2">muscle memory</div>
      <div className="font1">muscle memory</div>
      <div className="font3">muscle memory</div>
      <div className="font4">muscle memory</div> */}
    </div>
  );
};

export default HomePage;
