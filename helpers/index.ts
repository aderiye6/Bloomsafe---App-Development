import { generateRandomNumber } from '../utils/generateRandomNumber';

export const testWater = () =>
  new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(generateRandomNumber(1, 10));
    }, 3000);
  });
  export function formatError(response:any) {
  
  // console.log(response, "response")
    if (response?.data) {
      const { data, errors, title, message, error } = response.data
  // console.log(error, "errrrrrrrrr")
      if (error) {
        return error
      }
  

      if (data) {
        return data
      }
  
     
      if (errors) {
        return errors
      }
  
      return message || title
    }
  
    // return response?.error?.message ?? response?.error ?? 'Something went wrong!'
  }
  