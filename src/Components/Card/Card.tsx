import React, { useState } from "react";
import Tiles from "../Tiles/Tiles";
import { useTileContext } from "@/context/context";

type CardPropType = {
  currentRow: number;
  openedTileIndex: number;
  setCurrentRow: (val: any) => void;
  setOpenedTileIndex: (val: any) => void;
};

const Card = ({ currentRow, setCurrentRow , openedTileIndex , setOpenedTileIndex }: CardPropType) => {
  const { state, dispatch } = useTileContext();

  const handleTiles = (val: any, currentIndex: number) => {
    if (val.Title) {
      val.isOpened = true;
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
      console.log(currentIndex);
      setOpenedTileIndex(currentIndex + 1);
      setTimeout(() => {
        setCurrentRow(0);
        dispatch({
          type: "RESET_TILES",
        });
        setOpenedTileIndex(0);
      }, 400);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className={`p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid grid-cols-${state.numberOfTiles}`}>
        {state.tiles.map((row: any, rowIndex: number) =>
          row.map((tile: any, colIndex: number) => (
            <div key={`${rowIndex}-${colIndex}`}>
              <Tiles
                content={tile}
                handleTiles={handleTiles}
                activatedTile={
                  rowIndex + 1 == currentRow && colIndex < state.numberOfTiles
                }
                openedTileIndex={
                  currentRow === rowIndex + 1 &&
                  openedTileIndex === colIndex + 1
                }
                currentIndex={colIndex}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
