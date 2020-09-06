import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  FunctionComponent,
} from 'react';
import './StockPage.scss';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import Paginator from '../../shared/components/UIElements/Paginator/Paginator';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

interface stockProps {
  _id: string;
  if: string;
  then: string;
  color: string;
}

// TODO: type of direction..
let loadStocks: (
  direction?: any,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => Promise<void>;

const StockPage: FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const { token } = auth;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [stocks, setStocks] = useState<stockProps[]>([]);
  const [totalNoFilteredStocks, setTotalNoFilteredStocks] = useState<number>(0);
  const [stocksPage, setStocksPage] = useState<number>(1);
  const stocksPerPage: number = 2;

  useEffect(() => {
    loadStocks();
  }, [totalNoFilteredStocks]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [stocksPage]);

  loadStocks = useCallback(
    async (direction, event) => {
      if (event) event.persist();

      let page: number = stocksPage;

      if (direction) {
        if (direction === 'next') {
          page++;
          setStocksPage(page);
        } else if (direction === 'previous') {
          page--;
          setStocksPage(page);
        } else {
          page = direction;
          setStocksPage(page);
        }
      }

      try {
        // Fetch NO filtered stocks
        let url = `${process.env.REACT_APP_BACKEND_URL}/stocks/?page=${page}&limit=2`;

        const responseData = await sendRequest(url, 'GET', null, {
          Authorization: 'Bearer ' + token,
        });

        setStocks(responseData.data.data);
        setTotalNoFilteredStocks(responseData.total);
      } catch (err) {}
    },
    [stocksPage, sendRequest, token]
  );

  const stockElements = stocks.map((s) => (
    <FlipCard key={s._id} front={s.if} back={s.then} color={s.color} />
  ));

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="stock-page layout">
        <Paginator
          onPage={loadStocks}
          lastPage={Math.ceil(totalNoFilteredStocks / stocksPerPage)}
          currentPage={stocksPage}
        >
          <div className="stock-page__main">{stockElements}</div>
        </Paginator>
      </div>
    </React.Fragment>
  );
};

export default StockPage;

// useEffect(() => {
//   fetchAllStocks();
// }, [fetchAllStocks]);

// const fetchAllStocks = useCallback(async (): Promise<void> => {
//   try {
//     const responseData = await sendRequest(
//       `${process.env.REACT_APP_BACKEND_URL}/stocks`,
//       'GET',
//       null,
//       {
//         Authorization: 'Bearer ' + token,
//       }
//     );
//     setStocks(responseData.data.data);
//   } catch (error) {}
// }, [sendRequest, token]);
