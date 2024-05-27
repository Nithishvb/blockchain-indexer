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
        totalAmount: 50000
      };
    case "OPENED_TILES":
      return {
        ...state,
        isTileOpened: true,
      };
    default:
      return state;
  }
};
