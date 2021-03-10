'use strict';

//создаём класс js DomElement со свойствами, перечисленными в скобках.
function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}
//Метод при котором, если строка selector начинается с точки, создаем div с классом
// если строка selector  начинается с решетки # то создаем параграф с id
//название id или класса, является строка selector без первого символа
DomElement.prototype.createElm = function() {
    
    if (this.selector.charAt(0) === ".") {

        let elm = document.createElement('div');
        elm.classList = this.selector.substring(1);
        console.log('elm.id : ', elm.id );
        
        document.body.appendChild(elm);
        elm.innerText = "Some string";

    } else if (this.selector.charAt(0) === "#") {

        let elm2 = document.createElement("p");
        elm2.id = this.selector.substring(1);
        document.body.appendChild(elm2);
        elm2.innerText = "Some string2";
    } 
    else {
        alert ("Первый символ строки должен быть . или #. Повторите ввод.");
    }
};

const element = new DomElement("#first", {height: "20px"}, {width: "40px"}, {background: "yellow"}, {fontSize: "8px"});
console.log(element.selector.charAt(0));
element.createElm();
