import { useCallback, useContext, useState } from 'react';

import { AuthContext } from '../context/auth-context';
import { useHttpClient } from './http-hook';
import { useForm } from '../hooks/form-hook';

interface stockProps {
  _id: string;
  if: string;
  then: string;
  color: string;
}

interface quoteProps {
  text: string;
  author: string;
}

let loadStocks: (
  direction?: any,
  event?:
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
    | React.ChangeEvent<HTMLInputElement>
    | undefined
) => Promise<void>;

// HOOK API
export const useAPI = () => {
  // GENERAL
  const auth = useContext(AuthContext);
  const { token } = auth;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // GET RANDOM 12 API
  const [randomStocks, setRandomStocks] = useState<stockProps[]>([]);
  const [totalRandomStocks, setTotalRandomStocks] = useState<number>(0);

  // GET ALL API
  const [stocks, setStocks] = useState<stockProps[]>([]);
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
  const [selectedStockId, setSelectedStockId] = useState<string>('');

  // QUOTES API
  const [quote, setQuote] = useState<quoteProps | undefined>(undefined);

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
    async (id: string): Promise<void> => {
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

  // QUOTES API
  const fetchQuotesAPI = useCallback(async (): Promise<void> => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_QUOTES_URL}`
      );

      const randomIdx = Math.floor(Math.random() * responseData.length);

      setQuote(responseData[randomIdx]);
    } catch (error) {}
  }, [sendRequest]);

  return {
    isLoading,
    error,
    clearError,
    randomStocks,
    totalRandomStocks,
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
    quote,
    fetchQuotesAPI,
  };
};
