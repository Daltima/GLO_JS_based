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

class AppData {
    constructor() {

        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }  

    start() {

        this.budget = +salaryAmount.value;
    
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
    
        this.showResult();
    
        this.blocked();
    }

    //Функция блокирования инпутов слева, после нажатия кнопки "Рассчитать"
    blocked() {
        document.querySelectorAll('.data input[type=text]').forEach(function(input) {
            //Блокипуем блок с галочкой "Депозит"
            depositCheckbox.disabled = true;
            //Блокируем "плюсы"
            incomePlus.disabled = true;
            expensesPlus.disabled = true;

            if(!input.classList.contains('period-select')){
                input.disabled = true;
            }
        });
    }

    showResult() {
        budgetMonthValue.value =this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.map(n => `${n[0].toUpperCase()}${n.toLowerCase().
        slice(1)}`).join(', ');
        additionalIncomeValue.value = this.addIncome.map(n => `${n[0].toUpperCase()}${n.toLowerCase().
        slice(1)}`).join(', ');
        targetMonthValue.value = +Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', this.calcPeriod);
    } 

    addExpensesBlock() {
    
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
        dataInputs = document.querySelectorAll('.data input');
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    
    //После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Обязательные расходы" и возвращаем кнопку +
    resetExpensesBlock() {

        for(let i = 0; i < (expensesItems.length - 1); i++){
            expensesItems[i].remove();
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        
        if(expensesPlus.style.display === 'none'){
            expensesPlus.style.display = 'block';
        }  
    }

    addIncomeBlock() {
    
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
        dataInputs = document.querySelectorAll('.data input');
    }

    //После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Дополнительного дохода" и возвращаем кнопку +
    resetIncomeBlock() {

        for(let i = 0; i < (incomeItems.length - 1); i++){
            incomeItems[i].remove();
        }
        incomeItems = document.querySelectorAll('.income-items');
        
        if(incomePlus.style.display === 'none'){
            incomePlus.style.display = 'block';
        } 
    }

    //Дополнительный доход
    getIncome() {
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
    }

    //Возможные расходы
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) =>{
            item = item.trim();
            if (item !== ''){
                this.addExpenses.push(item);
            }
        });

    }
    //Получаем значения инпутов "Возможный доход"
    getAddIncome() {
        additionalIncomeItem.forEach((item) =>{
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for(let key in this.expenses){
    
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth/30);
    }
    getStatusIncome() {
       
        if(this.budgetDay >= 1200) {
            return('У Вас высокий уровень дохода');
        } else if(this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У Вас средний уровень дохода');
        } else if(this.budgetDay <= 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    }
    getTargetMonth() {
    
        return targetAmount.value/this.budgetMonth;
    }
    getInfoDeposit() {
    
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if(this.deposit){
    
            do { 
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while (!isNumber(this.percentDeposit));
    
            do { 
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(this.moneyDeposit));
        }
        
    }
    //Функция смены периода накопления
    period() {    
        periodAmount.innerText = periodSelect.value;
        incomePeriodValue.value = this.calcPeriod();
    }
    
    //Функция рассчёта накоплений за выбранное количество месяцев
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
        
    }
    //Проверка кнопки "Рассчитать" на событие "Клик"
    checkButton() { 
        if(salaryAmount.value !== ''){
            this.start();
            
            buttonCancel.style.display = "block";
            buttonStart.style.display = "none";
           
        } else {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        }
    }
    changeButton() {
    
            buttonCancel.style.display = "block";
            buttonStart.style.display = "none";
    }
    //После клика по кнопке "Сбросить", возвращаем поля и значения в первоначальное состояние.
    reset() {

        // Очищаем инпуты слева, после нажатия кнопки "Сбросить"
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
        
        //Очищаем поле "Месячный доход"
            salaryAmount.value = '';
        //Очищаем поле "Цель"
            targetAmount.value = '';
        //Снимаем галочку в квадрате "Депозит", если она была установлена
            depositCheckbox.checked = false;
            incomePeriodValue.value = 0;
        //Разблокируем "плюсы"
            incomePlus.disabled = false;
            expensesPlus.disabled = false;
        
            
            const inputs = document.querySelectorAll('input');
        
            inputs.forEach(function(item) {
                item.value = '';
            });
        //Разблокируем инпуты слева, после нажатия кнопки "Сбросить"
            dataInputs.forEach(function(input) {
                input.disabled = false;
            });
        //После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Дополнительного дохода" и возвращаем кнопку +    
        this.resetIncomeBlock();
        //После нажатия кнопки "Сбросить", удаляем лишние клоны строк "Обязательные расходы" и возвращаем кнопку +   
        this.resetExpensesBlock();
        //Возвращаем ползунок в исходное положение
        periodSelect.value = 1;
        periodAmount.innerText = 1;
            
        buttonStart.style.display = "block";
        buttonCancel.style.display = "none";
    }
        
    eventListeners() {
    
        buttonStart.addEventListener('click', appData.checkButton.bind(appData));
    
        //Клик по кнопке "Сбросить"
        buttonCancel.addEventListener('click', appData.reset.bind(appData));
    
        expensesPlus.addEventListener('click', appData.addExpensesBlock);
    
        incomePlus.addEventListener('click', appData.addIncomeBlock);
    
        periodSelect.addEventListener('input', appData.period.bind(appData));
    
    }
}

const appData = new AppData();

appData.eventListeners();

console.log(appData);


