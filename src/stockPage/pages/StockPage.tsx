import React, { useEffect, useState } from 'react';

import './StockPage.scss';
import AddModal from '../../shared/components/UIElements/AddModal/AddModal';
import EditModal from '../../shared/components/UIElements/EditModal/EditModal';
import AddButton from '../../shared/components/UIElements/AddButton/AddButton';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import SearchBar from '../../shared/components/UIElements/SearchBar/SearchBar';
import FlipCard from '../../shared/components/UIElements/FlipCard/FlipCard';
import Paginator from '../../shared/components/UIElements/Paginator/Paginator';
import Bubble from '../../shared/components/UIElements/Bubble/Bubble';
import { useAPI } from '../../shared/hooks/api-hook';
import { useModal } from '../../shared/hooks/modal-hook';
import { ScrollDownHideUpShow } from '../../shared/util/scrollDownHideUpShow';

interface stockProps {
  _id: string;
  if: string;
  then: string;
  color: string;
}

// TODO: FIGURE OUT WHY RADIO BUTTONS DOESN'T WORK AFTER A FEW CLICK
// TODO: ISSUE OF THE SAME ID OF RADIO
// COMPONENT
const StockPage = (): JSX.Element => {
  // CUSTOM HOOKS
  const {
    isLoading,
    error,
    clearError,
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
  } = useAPI();
  const { modalIsOpen, openModalHandler, closeModalHandler } = useModal();

  // LOCAL STATE
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);

  // EDIT MODAL HANDLER
  const openEditHandler = (): void => {
    setEditIsOpen(true);
  };
  const closeEditHandler = (): void => {
    setEditIsOpen(false);
  };

  // SCROLL
  const { isShow } = ScrollDownHideUpShow();

  // POST STOCK
  const stockAddHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    closeModalHandler();
    postStock(e);
  };

  // FETCH DATA WHEN THE FIRST RENDERING || DELETING A ITEM || ADDING A ITEM
  useEffect(() => {
    loadStocks();
  }, [totalNoFilteredStocks, loadStocks]);

  // SCROLL TO TOP WHEN USER CHANGE A PAGE
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [stocksPage]);

  // UPDATE STOCK
  const stockEditHandler = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    closeEditHandler();
    updateStock(e);
  };

  // OPEN EDIT MODAL
  const startEditHandler = (stock: stockProps): void => {
    setSelectedStockId(stock._id);
    openEditHandler();
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

  // JSX ELEMENTS [CARD, EDIT, DELETE]
  const stockElements = stocks.map((s) => (
    <div key={s._id} className="stock-page__card-wrapper">
      <FlipCard front={s.if} back={s.then} color={s.color} />
      <div className="stock-page__action-wrapper">
        <button onClick={() => startEditHandler(s)}>✎</button>
        <button onClick={() => deleteStock(s._id)}>✕</button>
      </div>
    </div>
  ));

  // RETURN JSX
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && <LoadingSpinner asOverlay />}

      <AddModal
        show={modalIsOpen}
        onCancel={closeModalHandler}
        onSubmit={stockAddHandler}
        onInput={inputChangeHandler}
      />

      <EditModal
        show={editIsOpen}
        onCancel={closeEditHandler}
        onSubmit={stockEditHandler}
        onInput={inputChangeHandler}
        formState={formState}
      />

      {isShow && <AddButton onClick={openModalHandler} />}

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
