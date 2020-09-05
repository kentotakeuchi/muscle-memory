import React, { useContext, useEffect, useCallback, useState } from 'react';
import './StockPage.scss';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

interface stockProps {
  _id: string;
  if: string;
  then: string;
  color: string;
}

const StockPage = (): JSX.Element => {
  const auth = useContext(AuthContext);
  const { token } = auth;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [stocks, setStocks] = useState<stockProps[]>([]);

  const fetchAllStocks = useCallback(async (): Promise<void> => {
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
    } catch (error) {}
  }, [sendRequest, token]);

  useEffect(() => {
    fetchAllStocks();
  }, [fetchAllStocks]);

  const stockElements = stocks.map((s) => (
    <FlipCard key={s._id} front={s.if} back={s.then} color={s.color} />
  ));

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="stock-page layout">
        <div className="stock-page__main">{stockElements}</div>
      </div>
    </React.Fragment>
  );
};

export default StockPage;
