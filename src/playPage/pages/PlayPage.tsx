import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  FunctionComponent,
} from 'react';
import './PlayPage.scss';
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

let loadRandomStocks: () => Promise<void>;

// COMPONENT
const PlayPage: FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const { token } = auth;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [stocks, setStocks] = useState<stockProps[]>([]);
  const [totalStocks, setTotalStocks] = useState<number>(0);

  useEffect(() => {
    loadRandomStocks();
  }, []);

  loadRandomStocks = useCallback(async () => {
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
  }, [sendRequest, token]);

  const stockElements = stocks.map((s) => (
    <FlipCard key={s._id} front={s.if} back={s.then} color={s.color} />
  ));

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="play-page layout">
        <div className="play-page__main">{stockElements}</div>
      </div>
    </React.Fragment>
  );
};

export default PlayPage;
