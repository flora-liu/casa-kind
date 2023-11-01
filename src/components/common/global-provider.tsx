"use client";

import { createContext, useContext, useState } from "react";

type NavPosition = "absolute" | "relative" | "fixed";
interface GlobalContextProps {
  navPosition: NavPosition;
  setNavPosition: (navPosition: NavPosition) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  navPosition: "relative",
  setNavPosition: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [navPosition, setNavPosition] = useState<NavPosition>("relative");

  return (
    <GlobalContext.Provider value={{ navPosition, setNavPosition }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
