import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  FunctionComponent,
} from 'react';
import './StockPage.scss';
import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import SearchBar from '../../shared/components/UIElements/SearchBar/SearchBar';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import Paginator from '../../shared/components/UIElements/Paginator/Paginator';
import Bubble from '../../shared/components/UIElements/Bubble/Bubble';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { ScrollDownHideUpShow } from '../../shared/util/scrollDownHideUpShow';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

const COLORS = [
  { value: 'magenta' },
  { value: 'yellow' },
  { value: 'lime' },
  { value: 'cyan' },
];

interface stockProps {
  _id: string;
  if: string;
  then: string;
  color: string;
}

// TODO: type of direction..
let loadStocks: (
  direction?: any,
  event?:
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
    | React.ChangeEvent<HTMLInputElement>
    | undefined
) => Promise<void>;

// TODO: MUST REFACTOR!!!
// TODO: FIGURE OUT WHY RADIO BUTTONS DOESN'T WORK AFTER A FEW CLICK
// TODO: ISSUE OF THE SAME ID OF RADIO
// COMPONENT
const StockPage: FunctionComponent = () => {
  // TOKEN OF CURRENT USER
  const auth = useContext(AuthContext);
  const { token } = auth;

  // HTTP REQUEST
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // FORM STATE
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

  // SCROLL
  const { isShow } = ScrollDownHideUpShow();

  // LOCAL STATE
  const [stocks, setStocks] = useState<stockProps[]>([]);
  const [selectedStockId, setSelectedStockId] = useState<string>('');
  const [totalNoFilteredStocks, setTotalNoFilteredStocks] = useState<number>(0);
  const [stocksPage, setStocksPage] = useState<number>(1);
  const stocksPerPage: number = 12;
  const [searchText, setSearchText] = useState<string | undefined>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // FETCH DATA WHEN THE FIRST RENDERING OR DELETING A ITEM
  useEffect(() => {
    loadStocks();
  }, [totalNoFilteredStocks]);

  // SCROLL TO TOP WHEN USER CHANGE A PAGE
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [stocksPage]);

  // FETCH STOCKS
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

  // UPDATE STOCK
  const stockSubmitHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    closeModalHandler();

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
  };

  // DELETE STOCK
  const deleteStockHandler = async (id: string): Promise<void> => {
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
  };

  // MODAL HANDLER
  const openModalHandler = (stock: stockProps): void => {
    setSelectedStockId(stock._id);
    setModalIsOpen(true);
    setFormData(
      {
        if: {
          value: stock.if,
          isValid: true,
        },
        then: {
          value: stock.then,
          isValid: true,
        },
        color: {
          value: stock.color,
          isValid: true,
        },
      },
      true
    );
  };
  const closeModalHandler = (): void => {
    setModalIsOpen(false);
  };

  // JSX ELEMENTS [CARD, EDIT, DELETE]
  const stockElements = stocks.map((s) => (
    <div key={s._id} className="stock-page__card-wrapper">
      <FlipCard front={s.if} back={s.then} color={s.color} />
      <div className="stock-page__action-wrapper">
        <button onClick={() => openModalHandler(s)}>✎</button>
        <button onClick={() => deleteStockHandler(s._id)}>✕</button>
      </div>
    </div>
  ));

  // RETURN JSX
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <Modal
        show={modalIsOpen}
        onCancel={closeModalHandler}
        onSubmit={stockSubmitHandler}
        header="update"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeModalHandler}>
              cancel
            </Button>
            <Button onClick={stockSubmitHandler}>save</Button>
          </React.Fragment>
        }
      >
        <Input
          element="input"
          id="if"
          type="text"
          placeholder="Please enter for front side"
          label="front"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text."
          onInput={inputChangeHandler}
          initialValue={formState.inputs.if.value}
          initialValid={formState.inputs.if.isValid}
        />
        <Input
          element="input"
          id="then"
          type="text"
          placeholder="Please enter for back side"
          label="back"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text."
          onInput={inputChangeHandler}
          initialValue={formState.inputs.then.value}
          initialValid={formState.inputs.then.isValid}
        />
        <div className="modal__radio-wrapper">
          {COLORS.map((c) => (
            <Input
              key={c.value}
              element="radio"
              value={c.value}
              id="color"
              label=""
              name="color"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please select a color"
              onInput={inputChangeHandler}
              initialValue={formState.inputs.color.value}
              initialValid={formState.inputs.color.isValid}
            />
          ))}
        </div>
      </Modal>

      <div className={`stock-page ${totalNoFilteredStocks > 0 && 'layout'}`}>
        {isShow && <SearchBar placeholder="Search.." onLoad={loadStocks} />}
        {totalNoFilteredStocks > 0 ? (
          <Paginator
            onPage={loadStocks}
            lastPage={Math.ceil(totalNoFilteredStocks / stocksPerPage)}
            currentPage={stocksPage}
            className="paginator--stock-page"
          >
            <div className="stock-page__main">{stockElements}</div>
          </Paginator>
        ) : (
          <div className="stock-page__bubble-wrapper">
            <Bubble
              width={30}
              height={15}
              text="Add an item you want to memorize"
            />
            <span role="img" aria-labelledby="emoji">
              😉
            </span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default StockPage;
