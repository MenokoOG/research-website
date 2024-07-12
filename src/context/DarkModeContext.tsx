import React, { useState, useEffect, createContext, useContext } from 'react';

const DarkModeContext = createContext<{ darkMode: boolean; toggleDarkMode: () => void }>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('dark-mode') || 'false');
    setDarkMode(savedDarkMode);
    document.body.classList.toggle('dark-mode', savedDarkMode);
    document.body.classList.toggle('light-mode', !savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
