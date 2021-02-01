let money = 30000,
income = 'фриланс',
addExpenses = 'Интернет, такси, коммуналка',
deposit = true,
mission = 150000,
period = 12,
budgetDay = money/30; 


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен '+ period + ' месяцев.');
console.log('Цель заработать '+ mission + ' гривен.');
//addExpenses переводим в нижний регистр и разбиваем на массив
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);


