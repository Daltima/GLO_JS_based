let money = 30000;
let income = 'фриланс';
let addExpenses = 'Интернет, такси, коммуналка';
let deposit = true;
let mission = 150000;
let period = 12; 


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен '+ period + ' месяцев.');
console.log('Цель заработать '+ mission + ' гривен.');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

let budgetDay = money/30;
console.log(budgetDay);