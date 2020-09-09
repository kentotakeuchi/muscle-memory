import { useState, useCallback } from 'react';

import { useHttpClient } from './http-hook';

interface stockProps {
  _id: string;
  if: string;
  then: string;
  color: string;
}

// TODO: type
export const useStock = () => {
  const [stocks, setStocks] = useState<stockProps[]>([]);
  const [totalStocks, setTotalStocks] = useState<number>(0);
  const { sendRequest } = useHttpClient();

  const fetchRandomMultipleStocks = useCallback(
    async (token: string | null) => {
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
