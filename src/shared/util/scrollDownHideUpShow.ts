import { useEffect, useState, useCallback } from 'react';

export const ScrollDownHideUpShow = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [scrollYPosition, setScrollYPosition] = useState<number>(0);

  const scrollEventHandler = useCallback(() => {
    // Store current scrollY position
    setScrollYPosition(window.pageYOffset);

    // Show hamburger icon when scroll up
    // Hide hamburger icon when scroll down
    window.scrollY > scrollYPosition ? setIsShow(false) : setIsShow(true);
  }, [scrollYPosition]);

  // Lifecycle
  useEffect(() => {
    window.addEventListener('scroll', scrollEventHandler);
    return () => window.removeEventListener('scroll', scrollEventHandler);
  }, [scrollEventHandler]);

  return { isShow };
};

export default ScrollDownHideUpShow;
