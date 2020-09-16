import { useCallback, useState } from 'react';

import { useHttpClient } from './http-hook';
import { QuoteProps } from '../types/types';

// HOOK API
export const useQuote = () => {
  // GENERAL
  const { sendRequest } = useHttpClient();

  // QUOTES API
  const [quote, setQuote] = useState<QuoteProps | undefined>(undefined);

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
    quote,
    fetchQuotesAPI,
  };
};
