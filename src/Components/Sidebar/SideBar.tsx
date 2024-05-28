import { useTileContext } from "@/context/context";
import React, { useState } from "react";

type SidebarPropType = {
  startBet: (val: any) => void;
  handleCashout: (val: any) => void;
  pickRandomTile: (val: any) => void;
};

const SideBar = ({ startBet , handleCashout , pickRandomTile }: SidebarPropType) => {
  const { state , dispatch } = useTileContext();
  const [betAmount, setBetAmount] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("low");  

  return (
    <div className="w-[300px] p-4 bg-green-400 rounded-md mr-[100px]">
      <div className="py-4">
        <span className="block text-center text-2xl">
          ₹ {state.totalAmount}
        </span>
      </div>
      <div className="py-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Bet Amount
        </label>
        <input
          type="number"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          autoComplete={"off"}
          required
          value={betAmount}
          onChange={(e) => setBetAmount(parseInt(e.target.value))}
        />
      </div>
      <div className="py-4">
        <form className="max-w-sm mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Difficulty
          </label>
          <select
            id="countries"
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value)
              dispatch({
                type: 'CHANGE_DIFFICULTY',
                payload: {
                  numberOfTiles: e.target.value == 'medium' ? 3 : e.target.value == 'hard' ? 2 : 4
                }
              })
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="hard">hard</option>
          </select>
        </form>
      </div>
      {state.isTileOpened ? (
        <div className="py-2">
          <div className="py-2">
            <button
              type="button"
              onClick={pickRandomTile}
              className="w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Pick random tile
            </button>
          </div>
          <div className="py-4">
            <input
              type="number"
              value={state.userProfit}
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              autoComplete={"off"}
            />
          </div>
          <div className="py-2 w-[100%]">
            <button
              type="button"
              onClick={handleCashout}
              className="w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Cashout
            </button>
          </div>
        </div>
      ) : (
        <div className="py-4 w-[100%]">
          <button
            onClick={() => {
              if(betAmount > state.totalAmount){
                alert("No fund available");
                return;
              }
              startBet(betAmount)
            }}
            disabled={betAmount === 0 || !betAmount}
            type="button"
            className={`w-[100%] text-white ${
              betAmount === 0 || !betAmount ? "bg-blue-300" : "bg-blue-700"
            } hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          >
            Bet
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
