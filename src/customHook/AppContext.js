import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [arr, setArr] = useState([]);

   const contextValue = {
    email,
    setEmail,
    arr,
    setArr,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
