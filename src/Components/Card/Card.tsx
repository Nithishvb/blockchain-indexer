import React from "react";
import Tiles from "../Tiles/Tiles";
import { useTileContext } from "@/context/context";

type CardPropType = {
  startBet: () => void;
  currentRow: number;
  activeTileCount: number;
  setCurrentRow: (val: any) => void;
}

const Card = ({ currentRow, activeTileCount, setCurrentRow} : CardPropType) => {

  const { state, dispatch } = useTileContext();
  
  const handleTiles = (val: any) => {
    if (val.Title) {
      val.isOpened = true;
      setCurrentRow((prevCount: number) => prevCount + 1);
    } else {
      setCurrentRow(0);
      dispatch({
        type: "RESET_TILES"
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 grid grid-cols-3">
        {state.tiles.map((row: any, rowIndex: number) =>
          row.map((tile: any, colIndex: number) => (
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
