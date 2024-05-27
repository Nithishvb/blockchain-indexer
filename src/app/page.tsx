"use client";

import Card from "@/Components/Card/Card";
import SideBar from "@/Components/Sidebar/SideBar";
import { useTileContext } from "@/context/context";
import { useState } from "react";

export default function Home() {

  const [activeTileCount, setActiveTileCount] = useState<number>(3);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const { dispatch } = useTileContext();

  const startBet = () => {
    setCurrentRow((prevCount) => prevCount + 1);
    dispatch({
      type: "OPENED_TILES"
    })
  };

  return (
    <main className="flex justify-center items-center">
      <SideBar startBet={startBet} />
      <Card
        activeTileCount={activeTileCount}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        startBet={startBet}
      />
    </main>
  );
}
