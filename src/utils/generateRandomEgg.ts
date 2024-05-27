export const generateRandomEgg = () => {
  const randomNum = Math.floor(Math.random() * 3) + 1; // Generates a random number between 1 and 3
  return randomNum === 1
    ? {
        Title: "dragon",
        isOpened: false,
      }
    : "";
};
