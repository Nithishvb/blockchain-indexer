"use client";

import Card from "@/Components/Card/Card";
import SideBar from "@/Components/Sidebar/SideBar";
import { useTileContext } from "@/context/context";
import { useState } from "react";

export default function Home() {
  const [activeTileCount, setActiveTileCount] = useState<number>(3);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const { state , dispatch } = useTileContext();

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
    const randomNum = Math.floor(Math.random() * 3); // Generates a random number between 1 and 3
    console.log(randomNum);
    if(state.tiles[currentRow][randomNum] && state.tiles[currentRow][randomNum].Title){
      state.tiles[currentRow][randomNum].isOpened = true;
      setCurrentRow((prevCount: number) => prevCount + 1);
      dispatch({
        type: "UPDATE_USER_PROFIT",
      });
    }else{
      setCurrentRow(0);
      dispatch({
        type: "RESET_TILES",
      });
    }
  };

  return (
    <main className="flex justify-center items-center">
      <SideBar startBet={startBet} handleCashout={handleCashout} pickRandomTile={pickRandomTile} />
      <Card
        activeTileCount={activeTileCount}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
      />
    </main>
  );
}
