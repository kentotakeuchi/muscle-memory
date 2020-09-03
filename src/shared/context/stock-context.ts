import { createContext } from 'react';

export const StockContext = createContext({
  stocks: [],
  totalStocks: 0,
  fetchRandomMultipleStocks: (token: string) => {},
});
