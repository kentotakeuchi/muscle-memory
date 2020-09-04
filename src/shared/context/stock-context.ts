import { createContext } from 'react';

// TODO: type
interface stockType {
  stocks: any[];
  totalStocks: number;
  fetchRandomMultipleStocks: (token: string) => void;
}

export const StockContext = createContext<stockType>({
  stocks: [],
  totalStocks: 0,
  fetchRandomMultipleStocks: (token) => {},
});
