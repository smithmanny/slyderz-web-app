import React, { createContext, useEffect, useState } from 'react';

import { debounce } from '../../utils/utils'

const INITIAL_WINDOW_STATE = {
  isMobile: false
};
export const WindowContext = createContext({
  ...INITIAL_WINDOW_STATE
});

export const withWindowContext = Component => (
  function ComponentWithWindowContext(props) {
    return (
      <WindowContext.Consumer>
        {windowState => <Component {...props} {...windowState} />}
      </WindowContext.Consumer>
    )
  }
)

const WindowProvider = ({ children }) => {
  const [windowState, setWindowState] = useState({ ...INITIAL_WINDOW_STATE })
  const handleResize = debounce(function () {
    setWindowState({
      isMobile: window.innerWidth < 600
    })
  }, 250)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  return (
    <WindowContext.Provider value={windowState}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowProvider;
