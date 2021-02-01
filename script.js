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
        amount2 = +prompt('Во сколько это обойдется?', 21600),

        budgetMonth = money - amount1 - amount2,
        missionPeriod = Math.ceil(mission/budgetMonth),
        budgetDay = Math.floor(budgetMonth/30);

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен '+ period + ' месяцев.');
console.log('Цель заработать '+ mission + ' гривен.');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + missionPeriod + ' месяцев');
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
