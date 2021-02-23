'use strict';

//Получаем кнопку "Рассчитать"
let buttonStart = document.getElementById('start'),
    buttonCancel = document.getElementById('cancel'),

//Получаем кнопки "+"
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheckbox = document.querySelector('#deposit-check'),//Получаем чекбокс (возле депозит)
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),//Получаем поля ввода доходов

//Получаем правую сторону, кроме budget_month-value
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    
//Получаем оставшиеся поля + range
    salaryAmount = document.querySelector('input.salary-amount'),
    
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('input.income-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    expensesAmount = document.querySelectorAll('.expenses-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    section = document.getElementsByClassName('main')[0],
    divData = document.getElementsByClassName('data')[0],
    dataInputs = document.querySelectorAll('.data input'),
    income = document.querySelector('.income');
    
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function() {

        this.budget = +salaryAmount.value;
    
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        this.blocked();

        console.log(this); 
    },
    //Функция блокирования инпутов слева, после нажатия кнопки "Рассчитать"
    blocked: function(){
        document.querySelectorAll('.data input[type=text]').forEach(function(input) {

            if(!input.classList.contains('period-select')){
                input.disabled = true;
            }
        });
    },
    showResult: function(){
        budgetMonthValue.value =this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.map(n => `${n[0].toUpperCase()}${n.toLowerCase().
        slice(1)}`).join(', ');
        additionalIncomeValue.value = this.addIncome.map(n => `${n[0].toUpperCase()}${n.toLowerCase().
        slice(1)}`).join(', ');
        targetMonthValue.value = +Math.ceil(this.getTargetMonth());
        periodSelect.addEventListener('input', this.calcPeriod);
        incomePeriodValue.value = this.calcPeriod();
        console.log('showResult: ',this);
    },
    addExpensesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
        dataInputs = document.querySelectorAll('.data input');
    },
     //Использование this невозможно
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
            console.log('getExpenses: ', this);
        });
    },
//После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Обязательные расходы" и возвращаем кнопку +
    resetExpensesBlock: function(){

        for(let i = 0; i < (expensesItems.length - 1); i++){
            expensesItems[i].remove();
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if(expensesPlus.style.display === 'none'){
            expensesPlus.style.display = 'block';
        }  
    },
    addIncomeBlock: function(){
        
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
        dataInputs = document.querySelectorAll('.data input');
    },
    //После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Дополнительного дохода" и возвращаем кнопку +
    resetIncomeBlock: function(){
        
            // incomeTitle.parentNode.removeChild(incomeItems);
 
        for(let i = 0; i < (incomeItems.length - 1); i++){
            incomeItems[i].remove();
        }
        incomeItems = document.querySelectorAll('.income-items');
          
        if(incomePlus.style.display === 'none'){
            incomePlus.style.display = 'block';
        } 
    },
//Дополнительный доход
    getIncome: function(){
        incomeItems.forEach((item) => {
            let itemIncome =  item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
        });
        for (let key in this.income){
            this.incomeMonth += +this.income[key];
            
        }
        console.log('getIncome: ', this);
    },
    //Возможные расходы
    getAddExpenses: () => {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
            console.log('getAddExpenses: ', this);
        });

    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
            console.log('getAddIncome: ', this);
        });
    },
    getExpensesMonth: function(){
        for(let key in this.expenses){
    
            this.expensesMonth += +this.expenses[key];
        }
        console.log('getExpensesMonth: ', this);
    },
    getBudget: function (){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth/30);
        console.log('getBudget: ', this);
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

        return targetAmount.value/this.budgetMonth;
    },
    getInfoDeposit: function(){
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
    //Использование this невозможно
    period: () => {
        periodAmount.innerText = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod();
        console.log('period: ', this);
    },
    //Использование this невозможно
    calcPeriod: () => {
        return appData.budgetMonth * periodSelect.value;
        
    },
    //Использование this невозможно
    checkButton: () => {
        if(salaryAmount.value !== ''){
            appData.start();
            console.log('checkButton: ', this);
            buttonCancel.style.display = "block";
            buttonStart.style.display = "none";
           
        } else {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        }
    },
    changeButton: function(){

            buttonCancel.style.display = "block";
            buttonStart.style.display = "none";
    },
    //Использование this невозможно
    reset: function(){

    // Очищаем инпуты слева, после нажатия кнопки "Сбросить"
        appData.income = {};
        appData.incomeMonth = 0;
        appData.addIncome = [];
        appData.expenses = {};
        appData.addExpenses = [];
        appData.deposit = false;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        appData.budget = 0;
        appData.budgetDay = 0;
        appData.budgetMonth = 0;
        appData.expensesMonth = 0;
       
    //Очищаем поле "Месячный доход"
        salaryAmount.value = '';
    //Очищаем поле "Цель"
        targetAmount.value = '';
    //Снимаем галочку в квадрате "Депозит", если она была установлена
        depositCheckbox.checked = false;
        incomePeriodValue.value = 0;
        
    
        
        const inputs = document.querySelectorAll('input');

        inputs.forEach(function(item) {
            item.value = '';
        });
//Разблокируем инпуты слева, после нажатия кнопки "Сбросить"
        dataInputs.forEach(function(input) {
            input.disabled = false;
        });
//После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Дополнительного дохода" и возвращаем кнопку +    
     appData.resetIncomeBlock();
//После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Обязательные расходы" и возвращаем кнопку +   
     appData.resetExpensesBlock();
//Возвращаем ползунок в исходное положение
     periodSelect.value = 1;
     periodAmount.innerText = 1;
        
    buttonStart.style.display = "block";
    buttonCancel.style.display = "none";
    console.log('reset: ', this);
    },
};

buttonStart.addEventListener('click', appData.checkButton);

//Клик по кнопке "Сбросить"
buttonCancel.addEventListener('click', appData.reset);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.period);
