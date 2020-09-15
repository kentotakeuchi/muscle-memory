import { useState } from 'react';

// HOOK MODAL
export const useSideDrawer = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return { drawerIsOpen, openDrawerHandler, closeDrawerHandler };
};
