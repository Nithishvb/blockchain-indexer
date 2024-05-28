import { InitialStateType } from "@/context/context";
import { generateRandomEgg } from "@/utils/generateRandomEgg";

export const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case "RESET_TILES":
      return {
        tiles: [...Array(state.numberOfTiles % 2 == 0 ? 8 : 9)].map((e) =>
          Array(state.numberOfTiles).fill("Tile").map(generateRandomEgg)
        ),
        isTileOpened: false,
        totalAmount: state.totalAmount,
        userProfit: 0,
        numberOfTiles: state.numberOfTiles
      };
    case "OPENED_TILES":
      return {
        ...state,
        isTileOpened: true,
        totalAmount: state.totalAmount - action.payload.betAmount,
      };
    case "UPDATE_USER_PROFIT":
      return {
        ...state,
        userProfit: (state.userProfit += 10),
      };
    case "CASH_OUT":
      return {
        ...state,
        tiles: [...Array(state.numberOfTiles % 2 == 0 ? 8 : 9)].map((e) =>
          Array(state.numberOfTiles).fill("Tile").map(generateRandomEgg)
        ),
        isTileOpened: false,
        totalAmount: state.totalAmount + state.userProfit,
        userProfit: 0,
      };
    case "CHANGE_DIFFICULTY":
        return {
          tiles: [...Array(action.payload.numberOfTiles % 2 == 0 ? 8 : 9)].map((e) =>
            Array(action.payload.numberOfTiles).fill("Tile").map(generateRandomEgg)
          ),
          isTileOpened: false,
          totalAmount: state.totalAmount + state.userProfit,
          userProfit: 0,
          numberOfTiles: action.payload.numberOfTiles
        };
    default:
      return state;
  }
};
