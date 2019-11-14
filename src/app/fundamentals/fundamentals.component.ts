export function compute(number){
  if(number<0)
    return 0;
  
  return number+1;
}
export function greet(name){
  return `my name is ${name}`
}

export function getCurrencies(){
  return ['USD','AUD','EUR'];
}
