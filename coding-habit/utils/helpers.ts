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
  if(number.length <= 3) {
    return '$'+number;
  }
  const splitNumber = number.split('').reverse();
  let counter = 1;
  const currencyNumber: string[] = [];
  splitNumber.forEach(n => {
    if(counter%3 == 0 && counter!=splitNumber.length) {
      counter++;
      currencyNumber.push(n);
      currencyNumber.push('.')
    }else {
      counter++
      currencyNumber.push(n);
    }
  })
  return '$'+currencyNumber.reverse().join('');
}

export function generateAccessCode(): string {
  const uuid1 = crypto.randomUUID();
  const uuid2 = crypto.randomUUID();
  
  const part1 = uuid1.slice(-4);
  const part2 = uuid2.slice(0, 4);
  
  return `${part1}-${part2}`.toUpperCase();
}

export function validateAccessCodeFormat(code: string): boolean {
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(code);
}
