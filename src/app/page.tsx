"use client";

import Card from "@/Components/Card/Card";
import SideBar from "@/Components/Sidebar/SideBar";
import { useTileContext } from "@/context/context";
import { useState } from "react";

export default function Home() {
  const [currentRow, setCurrentRow] = useState<number>(0);
  const { state, dispatch } = useTileContext();

  const startBet = (betAmount: number) => {
    setCurrentRow((prevCount) => prevCount + 1);
    dispatch({
      type: "OPENED_TILES",
      payload: {
        betAmount,
      },
    });
  };

  const handleCashout = () => {
    setCurrentRow(0);
    dispatch({
      type: "CASH_OUT",
    });
  };

  const pickRandomTile = () => {
    const randomNum = Math.floor(Math.random() * state.numberOfTiles); // Generates a random number between 1 and 3
    if (
      state.tiles[currentRow-1][randomNum] &&
      state.tiles[currentRow-1][randomNum].Title
    ) {
      state.tiles[currentRow-1][randomNum].isOpened = true;
      setCurrentRow((prevCount: number) => prevCount + 1);
      dispatch({
        type: "UPDATE_USER_PROFIT",
      });
      if(currentRow === (state.numberOfTiles % 2 == 0 ? 8 : 9)){
        setCurrentRow(0);
        dispatch({
          type: "CASH_OUT",
        });
      }
    } else {
      setCurrentRow(0);
      dispatch({
        type: "RESET_TILES",
      });
    }
  };

  return (
    <main className="flex justify-center items-center">
      <SideBar
        startBet={startBet}
        handleCashout={handleCashout}
        pickRandomTile={pickRandomTile}
      />
      <Card
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
      />
    </main>
  );
}
