'use strict';

//Получаем кнопку "Рассчитать"
const buttonStart = document.getElementById('start'),

//Получаем кнопки "+"
    buttonPlus1 = document.getElementsByTagName('button')[0],
    buttonPlus2 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),//Получаем чекбокс (возле депозит)
    inputField = document.querySelectorAll('.additional_income-item'),//Получаем поля ввода доходов

//Получаем правую сторону, кроме budget_month-value
    dayValue = document.getElementsByClassName('budget_day-value'),
    expMonthValue = document.getElementsByClassName('expenses_month-value'),
    addIncomeValue = document.getElementsByClassName('additional_income-value'),
    addExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),

//Получаем оставшиеся поля + range
    salaryAmount = document.querySelector('.salary-amount'),
    incomeAmount = document.querySelector('.income-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    monthValue = document.querySelector('.budget_month-value');



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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){

        if(confirm('Есть ли у Вас дополнительный источник заработка?')){
            let itemIncome,
                cashIncome;
            do { 
                itemIncome = prompt('Какой у Вас есть дополнительный заработок?', 'Таксую');
            }
            while (itemIncome.trim() === '' || isNumber(itemIncome));

            do { 
                cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 10000);
            }
            while (!isNumber(cashIncome));
             
            appData.income[itemIncome] = cashIncome;
            
        }
        console.log('appData.income: ', appData.income);
        do { 
            appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
         'такси, коммунальные, питание, обучение');
        }
        while (appData.addExpenses.trim() === '' || isNumber(appData.addExpenses));
        
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let sum = 0;
        let expenseName = {};

        for(let i = 0; i < 2; i++) {
            do { 
                expenseName = prompt('Введите обязательную ' + (i + 1) + '-ю статью расходов?');
            }
            while (expenseName.trim() === '' || isNumber(expenseName));
                               
    
            do { 
                sum = prompt('Во сколько обойдется  ' + (i + 1) + '-я статья расходов?');
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
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
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
    },
    getInfoDeposit: function(){
        if(appData.deposit){

            do { 
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(appData.percentDeposit));

            do { 
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getStatusIncome());

if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

appData.getInfoDeposit();

console.log("Наша программа включает в себя данные: ");
for(let key in appData) {

        console.log(key + ':' + appData[key]);
}

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

/*Вывожу строку из элементов массива appData.addExpenses с разделителем ', ',
 где каждый элемент массива начинается с заглавной буквы*/
console.log(appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));