import React, {createContext, useContext} from 'react';
import {themes} from '../assets/Colors/Theme';

const ThemeContext = createContext(themes);

export const ThemeProvider = ({children}) => {
  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
