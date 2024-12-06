import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [getexperience, setgetexperience] = useState(0);
  const [getcoin, setgetcoin] = useState(0);
  const [coins, setCoins] = useState(0);
  const [achievementNotifydisable,setachievementNotifydisable] = useState(true);

  return (
    <AppContext.Provider value={{ coins, setCoins, getexperience, setgetexperience, getcoin, setgetcoin,achievementNotifydisable,setachievementNotifydisable }}>
      {children}
    </AppContext.Provider>
  );
};
