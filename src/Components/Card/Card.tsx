"use client";

import React, { useEffect, useState } from "react";
import Tiles from "../Tiles/Tiles";

const Card = () => {
  const generateRandomEgg = () => {
    const randomNum = Math.floor(Math.random() * 3) + 1; // Generates a random number between 1 and 3
    return randomNum === 1
      ? {
          Title: "dragon",
          isOpened: false,
        }
      : "";
  };

  const [tiles, setTiles] = useState(
    [...Array(9)].map((e) =>
      Array(3)
        .fill({
          Title: "Tile",
          isOpened: false,
        })
        .map(generateRandomEgg)
    )
  );
  const [activeTileCount, setActiveTileCount] = useState<number>(3);
  const [currentRow, setCurrentRow] = useState<number>(0);

  const startBet = () => {
    setCurrentRow((prevCount) => prevCount + 1);
  };

  const handleTiles = (val: any) => {
    if (val.Title) {
      val.isOpened = true;
      setCurrentRow((prevCount) => prevCount + 1);
    } else {
      setCurrentRow(0);
      setTiles(
        [...Array(9)].map((e) => Array(3).fill("Tile").map(generateRandomEgg))
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <button className="bg-red-700 p-2 text-white" onClick={startBet}>
        Start Play
      </button>
      <div className="max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid grid-cols-3">
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`}>
              <Tiles
                content={tile}
                handleTiles={handleTiles}
                activatedTile={
                  rowIndex + 1 == currentRow && colIndex < activeTileCount
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
