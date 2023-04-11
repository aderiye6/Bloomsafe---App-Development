import { generateRandomNumber } from '../utils/generateRandomNumber';

export const testWater = () =>
  new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(generateRandomNumber(1, 10));
    }, 3000);
  });
