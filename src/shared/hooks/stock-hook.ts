import { useState, useCallback } from 'react';

import { useHttpClient } from './http-hook';

export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredTotalStocks, setFilteredTotalStocks] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const { sendRequest } = useHttpClient();

  const fetchAllStocks = useCallback(
    async (token: string) => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/stocks`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + token,
          }
        );

        setStocks(responseData.data.data);
        setFilteredTotalStocks(responseData.filteredTotal);
        setTotalStocks(responseData.total);
      } catch (err) {}
    },
    [sendRequest]
  );

  return { stocks, filteredTotalStocks, totalStocks, fetchAllStocks };
};
