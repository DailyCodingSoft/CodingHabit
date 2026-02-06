import { Jomhuria } from "next/font/google";

/**
 * Funciones utilitarias del proyecto
 */
export function noop() {
  return null;
}

export function getLastCommitDate(username: string): Date {
  //this function will fetch the last commit date from github api for the given user
  return new Date();
}

export function formatNumberToCurrency(number:string):string {
  console.log('enter: ', number)
  const splitNumber = number.split('');
  let counter = 1;
  const currencyNumber: string[] = [];
  splitNumber.forEach(n => {
    if(counter == 3) {
      counter = 1;
      currencyNumber.push('.')
      currencyNumber.push(n);
    }else {
      counter++
      currencyNumber.push(n);
    }
  })
  console.log('comesout: ', currencyNumber.join(''))
  return currencyNumber.join('');
}
