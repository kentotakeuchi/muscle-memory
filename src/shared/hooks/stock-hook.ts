import { useCallback, useContext, useState } from 'react';

import { AuthContext } from '../context/auth-context';
import { useHttpClient } from './http-hook';
import { useForm } from './form-hook';
import { StockProps } from '../types/types';

let loadStocks: (
  direction?: any,
  event?:
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
    | React.ChangeEvent<HTMLInputElement>
    | undefined
) => Promise<void>;

// HOOK API
export const useStock = () => {
  // GENERAL
  const auth = useContext(AuthContext);
  const { token } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // GET RANDOM 12 API
  const [randomStocks, setRandomStocks] = useState<StockProps[]>([]);
  const [totalRandomStocks, setTotalRandomStocks] = useState<number>(0);
  // CHECK THE USER HAS A STOCK IN DATABASE
  const [hasStocks, setHasStocks] = useState<boolean>(false);

  // GET ALL API
  const [stocks, setStocks] = useState<StockProps[]>([]);
  const [totalNoFilteredStocks, setTotalNoFilteredStocks] = useState<number>(0);
  const [stocksPage, setStocksPage] = useState<number>(1);
  const stocksPerPage: number = 12;
  const [searchText, setSearchText] = useState<string | undefined>('');

  // POST & UPDATE API
  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      if: {
        value: '',
        isValid: false,
      },
      then: {
        value: '',
        isValid: false,
      },
      color: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  // UPDATE API
  const [selectedStockId, setSelectedStockId] = useState<string | undefined>(
    ''
  );

  // GET RANDOM 12 API
  const fetchRandomMultipleStocks = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stocks/random-multiple`,
        'GET',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );

      setRandomStocks(responseData.data);
      setTotalRandomStocks(responseData.total);
      responseData.data.length > 0 && setHasStocks(true);
    } catch (err) {}
  }, [sendRequest, token]);

  // GET ALL + PAGINATION + SEARCH API
  loadStocks = useCallback(
    async (direction, event) => {
      if (event) event.persist();

      let page: number = stocksPage;
      let query: string | undefined = searchText;

      if (direction) {
        if (direction === 'next') {
          page++;
          setStocksPage(page);
        } else if (direction === 'previous') {
          page--;
          setStocksPage(page);
        } else if (direction === 'search') {
          query = event && (event.target as HTMLInputElement).value;
          page = 1;
          setStocksPage(page);
          setSearchText(query);
        } else {
          page = direction;
          setStocksPage(page);
        }
      }

      try {
        // URL for NO filtered stocks
        let url = `${process.env.REACT_APP_BACKEND_URL}/stocks?page=${page}&limit=${stocksPerPage}`;

        // URL for filtered stocks by search text
        if (query || searchText) {
          url += query ? `&if=${query}` : '';
        }

        const responseData = await sendRequest(url, 'GET', null, {
          Authorization: 'Bearer ' + token,
        });

        const stockArray = responseData.data.data;
        setStocks(stockArray);
        setTotalNoFilteredStocks(responseData.total);
      } catch (err) {}
    },
    [stocksPage, sendRequest, token, searchText]
  );

  // POST API
  const postStock = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<any> => {
      e.preventDefault();

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/stocks`,
          'POST',
          JSON.stringify({
            if: formState.inputs.if.value,
            then: formState.inputs.then.value,
            color: formState.inputs.color.value,
          }),
          {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          }
        );

        // FOR RE-RENDER TO SHOW STOCKS AFTER ADDING
        setTotalRandomStocks((prevState) => prevState + 1);
        setTotalNoFilteredStocks((prevState) => prevState + 1);
        alert('saved 😉');
      } catch (err) {}
    },
    [sendRequest, token, formState]
  );

  // UPDATE API
  const updateStock = useCallback(
    async (
      e:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<any> => {
      e.preventDefault();

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/stocks/${selectedStockId}`,
          'PATCH',
          JSON.stringify({
            if: formState.inputs.if.value,
            then: formState.inputs.then.value,
            color: formState.inputs.color.value,
          }),
          {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          }
        );

        setTotalNoFilteredStocks((prevState) => prevState - 1);
        alert('updated 😉');
      } catch (err) {}
    },
    [sendRequest, token, formState, selectedStockId]
  );

  // DELETE API
  const deleteStock = useCallback(
    async (id: string | undefined): Promise<void> => {
      if (window.confirm("Are you sure? It can't be undone thereafter 😒")) {
        try {
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/stocks/${id}`,
            'DELETE',
            null,
            {
              Authorization: 'Bearer ' + token,
            }
          );

          setStocksPage(1);

          // SIZE -1 FOR RE-RENDERING AFTER DELETING
          setTotalNoFilteredStocks((prevState) => prevState - 1);
        } catch (err) {}
      }
    },
    [sendRequest, token]
  );

  const removeOneRandomStock = () => {
    setTotalRandomStocks((prevState) => prevState - 1);
    setRandomStocks((prevState) => prevState.slice(1));
  };

  return {
    isLoading,
    error,
    clearError,
    randomStocks,
    totalRandomStocks,
    hasStocks,
    fetchRandomMultipleStocks,
    stocks,
    totalNoFilteredStocks,
    stocksPage,
    stocksPerPage,
    loadStocks,
    inputChangeHandler,
    postStock,
    setSelectedStockId,
    formState,
    setFormData,
    updateStock,
    deleteStock,
    removeOneRandomStock,
  };
};
