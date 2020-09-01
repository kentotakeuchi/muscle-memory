import { createContext } from 'react';

export const StockContext = createContext({
  stocks: [],
  filteredTotalStocks: 0,
  totalStocks: 0,
  fetchAllStocks: (token: string) => {},
});
