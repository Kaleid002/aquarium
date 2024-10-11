import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [getexperience, setgetexperience] = useState(0);
  const [getcoin, setgetcoin] = useState(0);

  return (
    <AppContext.Provider value={{ getexperience, setgetexperience, getcoin, setgetcoin }}>
      {children}
    </AppContext.Provider>
  );
};
