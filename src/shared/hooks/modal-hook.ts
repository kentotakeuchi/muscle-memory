import { useState } from 'react';

// HOOK MODAL
export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModalHandler = (): void => {
    setModalIsOpen(true);
  };
  const closeModalHandler = (): void => {
    setModalIsOpen(false);
  };

  return { modalIsOpen, openModalHandler, closeModalHandler };
};
