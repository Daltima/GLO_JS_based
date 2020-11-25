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

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');


let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' + budgetMonth);

let missionPeriod = Math.ceil(mission/budgetMonth);
console.log('Цель будет достигнута за ' + missionPeriod + ' месяцев');

budgetDay = Math.floor(budgetMonth/missionPeriod);
console.log('Бюджет на день ' + budgetDay);

if(budgetDay > 1200 || budgetDay === 1200) {
    console.log('У Вас высокий уровень дохода');
} else if(budgetDay > 600 && budgetDay < 1200) {
    console.log('У Вас средний уровень дохода');
} else if(budgetDay < 600 && budgetDay < 0 || budgetDay === 600  || budgetDay === 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}
