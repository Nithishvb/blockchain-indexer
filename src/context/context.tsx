"use client";

import { reducer } from "@/reducer/reducer";
import { generateRandomEgg } from "@/utils/generateRandomEgg";
import React, { ReactNode, createContext, useContext, useReducer } from "react";

interface AppWrapperProps {
  children: ReactNode;
}

export type InitialStateType = {
  tiles: any[],
  isTileOpened: boolean,
  totalAmount: number,
  userProfit: number
}

const InitialState : InitialStateType = {
  tiles: [...Array(9)].map((e) =>
    Array(3)
      .fill({
        Title: "Tile",
        isOpened: false,
      })
      .map(generateRandomEgg)
  ),
  isTileOpened: false,
  totalAmount: 50000,
  userProfit: 0
};

// Create the context
export const AppContext = createContext<any>(null);

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  // Use the useReducer hook to manage the state
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access AppContext
export const useTileContext = () => useContext(AppContext);