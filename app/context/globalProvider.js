'use client';

import { createContext, useContext, useState } from 'react';
import themes from './themes';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);

  const theme = themes[selectedTheme];
  return (
    <GlobalContext.Provider value={{ theme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
