import { InitialStateType } from "@/context/context";
import { generateRandomEgg } from "@/utils/generateRandomEgg";

export const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case "RESET_TILES":
      return {
        tiles: [...Array(9)].map((e) =>
          Array(3).fill("Tile").map(generateRandomEgg)
        ),
        isTileOpened: false,
        totalAmount: state.totalAmount,
        userProfit: 0,
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
    case "CASHOUT_PROFIT":
      return {
        ...state,
        totalAmount: state.totalAmount + state.userProfit,
      };
    case "CASH_OUT":
      return {
        tiles: [...Array(9)].map((e) =>
          Array(3).fill("Tile").map(generateRandomEgg)
        ),
        isTileOpened: false,
        totalAmount: state.totalAmount + state.userProfit,
        userProfit: 0,
      };
    default:
      return state;
  }
};
