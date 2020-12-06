'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
const start = function() {
        do {
            money = prompt('Ваш месячный доход?', 30000);
        }
        while (!isNumber(money));

        money = +money;
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
         'такси, коммунальные, питание, обучение');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0;
        let expenseName = {};

        for(let i = 1; i < 3; i++) {
           expenseName = prompt('Введите обязательную ' + i + '-ю статью расходов?');                    
    
            do { 
                sum = prompt('Во сколько обойдется  ' + i + '-я статья расходов?');
            }
            while (!isNumber(sum));
            
            appData.expenses[expenseName] = +sum;
        }
    },
    getExpensesMonth: function(){
        for(let key in appData.expenses){
    
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function (){
        return money - appData.expensesMonth;
    },
    getStatusIncome: function(){
    
        if(appData.budgetDay >= 1200) {
            return('У Вас высокий уровень дохода');
        } else if(appData.budgetDay > 600 && appData.budgetDay < 1200) {
            return ('У Вас средний уровень дохода');
        } else if(appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    },
    getTargetMonth: function() {

        return Math.ceil(appData.mission/appData.budgetMonth);
    }
};

appData.asking();
appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);
appData.budgetMonth = appData.getBudget();

appData.budgetDay = Math.floor(appData.budgetMonth/30);

console.log(appData.getStatusIncome());

appData.missionPeriod = appData.getTargetMonth();

if (appData.missionPeriod >= 0) {
    console.log('Цель будет достигнута за ' + appData.missionPeriod + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

console.log("Наша программа включает в себя данные: ");
for(let key in appData) {

        console.log(key + ':' + appData[key]);
}
