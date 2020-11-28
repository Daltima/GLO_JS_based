'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
'такси, коммунальные, питание, обучение'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 150000,
    period = 12;

const start = function() {

    do {
        money = prompt('Ваш месячный доход?', 1000);
    }
    while (!isNumber(money));

    money = +money;

};

start();

const showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(', '));   

const getExpensesMonth = function() {

    let sumExpensesMonth = 0,
        sum = 0;

    for(let i = 1; i < 3; i++) {

        expenses[i] = prompt('Введите обязательную ' + i + '-ю статью расходов?');

        do { 
            sum = prompt('Во сколько обойдется  ' + i + '-я статья расходов?');
        }
        while (!isNumber(sum));

        sumExpensesMonth +=  +sum;

    }

    return sumExpensesMonth;
};

const expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmount);

function getAccumulatedMonth() {
    return money - expensesAmount;
}
const accumulatedMonth = getAccumulatedMonth();
console.log('Бюджет на месяц: ' + accumulatedMonth);

const budgetDay = Math.floor(accumulatedMonth/30);
console.log('Бюджет на день ' + budgetDay);

const getStatusIncome = function(){
    
    if(budgetDay >= 1200) {
        return('У Вас высокий уровень дохода');
    } else if(budgetDay > 600 && budgetDay < 1200) {
        return ('У Вас средний уровень дохода');
    } else if(budgetDay <= 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};
console.log(getStatusIncome());

function getTargetMonth() {

    return mission/accumulatedMonth;
}
const missionPeriod = Math.ceil(getTargetMonth());

if (missionPeriod >= 0) {
    console.log('Цель будет достигнута за ' + missionPeriod + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}