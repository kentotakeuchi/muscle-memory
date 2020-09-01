import { useState, useCallback, useRef, useEffect } from 'react';

// TODO: type
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  // TODO: type
  const activeHttpRequests = useRef<any[]>([]);
  // console.log({ activeHttpRequests }); // {current: []}

  // TODO: type
  const sendRequest = useCallback(
    async (
      url: string,
      method: string = 'GET',
      body: any = null,
      headers: any = {}
    ): Promise<any> => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      // console.log({ activeHttpRequests }); // {current: Array(1)
      // 0: AbortController
      // signal: AbortSignal
      // aborted: false
      // onabort: null}

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        if (response.status === 204) return null;

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
