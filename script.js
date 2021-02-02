'use strict';

const money = +prompt('Ваш месячный доход?', 50000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'такси, коммунальные, питание, обучение'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 150000,
    period = 12,
    expenses1 = prompt('Введите обязательную статью расходов?', 'коммунальные'),
    amount1 = +prompt('Во сколько это обойдется?', 5400),
    expenses2 = prompt('Введите обязательную статью расходов?', 'питание'),
    amount2 = +prompt('Во сколько это обойдется?', 21600);

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
    


function getExpensesMonth() {
    return amount1 + amount2;
}

function getAccumulatedMonth() {
    return money - amount1 - amount2;
}


let accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth/30),
    getStatusIncome = function(){
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
    function getTargetMonth() {
        return mission/accumulatedMonth;
    }
    const missionPeriod = Math.ceil(getTargetMonth());

console.log(addExpenses.split(', '));
console.log(getExpensesMonth());
console.log('Бюджет на месяц: ' + accumulatedMonth);
console.log('Бюджет на день ' + budgetDay);
console.log(getStatusIncome());
console.log('Цель будет достигнута за ' + missionPeriod + ' месяцев');

