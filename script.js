'use strict';

let money = +prompt('Ваш месячный доход?', 50000);
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
'такси, коммунальные, питание, обучение');
let deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 150000;
const period = 12; 

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен '+ period + ' месяцев.');
console.log('Цель заработать '+ mission + ' гривен.');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?', 'коммунальные');
let amount1 = +prompt('Во сколько это обойдется?', 5400);

let expenses2 = prompt('Введите обязательную статью расходов?', 'питание');
let amount2 = +prompt('Во сколько это обойдется?', 21600);

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' + budgetMonth);

let missionPeriod = Math.ceil(mission/budgetMonth);
console.log('Цель будет достигнута за ' + missionPeriod + ' месяцев');

let budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день ' + budgetDay);

if(budgetDay >= 1200) {
    console.log('У Вас высокий уровень дохода');
} else if(budgetDay > 600 && budgetDay < 1200) {
    console.log('У Вас средний уровень дохода');
} else if(budgetDay <= 600 && budgetDay <= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}
