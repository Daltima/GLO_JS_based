'use strict';

let money = +prompt('Ваш месячный доход?', 50000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
'такси, коммунальные, питание, обучение'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 150000,
    period = 12;

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
    
console.log(addExpenses.split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?', 'коммунальные');
let amount1 = +prompt('Во сколько это обойдется?', 5400);

let expenses2 = prompt('Введите обязательную статью расходов?', 'питание');
let amount2 = +prompt('Во сколько это обойдется?', 21600);

function getExpensesMonth() {
    return amount1 + amount2;
}
console.log(getExpensesMonth());

function getAccumulatedMonth() {
    return money - amount1 - amount2;
}
let accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц: ' + accumulatedMonth);

let budgetDay = Math.floor(accumulatedMonth/30);
console.log('Бюджет на день ' + budgetDay);

let getStatusIncome = function(){
    if(budgetDay >= 1200) {
        return('У Вас высокий уровень дохода');
    } else if(budgetDay > 600 && budgetDay < 1200) {
        return ('У Вас средний уровень дохода');
    } else if(budgetDay <= 600 && budgetDay <= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};
console.log(getStatusIncome());

function getTargetMonth() {
    return mission/accumulatedMonth;
}
let missionPeriod = Math.ceil(getTargetMonth());
console.log('Цель будет достигнута за ' + missionPeriod + ' месяцев');

