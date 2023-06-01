import { generateRandomNumber } from '../utils/generateRandomNumber';

export const testWater = () =>
  new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(generateRandomNumber(1, 10));
    }, 3000);
  });
  export function formatError(response:any) {
    console.log(response?.error, "respose")
  
    if (response?.data) {
      const { data, errors, title, message, error } = response.data
  
      if (data) {
        return Object.values(data).join(', ')
      }
  
     
      if (errors) {
        return Object.values(errors).join(', ')
      }
  
      return message || title
    }
  
    return response?.error?.message ?? response?.error ?? 'Something went wrong!'
  }
  