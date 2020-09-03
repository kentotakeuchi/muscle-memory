import { useState, useCallback } from 'react';

import { useHttpClient } from './http-hook';

export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [totalStocks, setTotalStocks] = useState(0);
  const { sendRequest } = useHttpClient();

  const fetchRandomMultipleStocks = useCallback(
    async (token: string) => {
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
        setTotalStocks(responseData.total);
      } catch (err) {}
    },
    [sendRequest]
  );

  return {
    stocks,
    totalStocks,
    fetchRandomMultipleStocks,
  };
};
