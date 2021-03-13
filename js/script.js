'use strict';

//создаём класс js DomElement со свойствами, перечисленными в скобках.
function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

const element = new DomElement('.first', '120px', '300px', 'yellow', '40px');
const elementP = new DomElement('#second', '120px', '300px', 'blue', '40px');

//Метод при котором, если строка selector начинается с точки, создаем div с классом
// если строка selector  начинается с решетки # то создаем параграф с id
//название id или класса, является строка selector без первого символа
DomElement.prototype.createElm = function() {
    
    if (this.selector.charAt(0) === ".") {

        let elm = document.createElement('div');
        elm.classList = this.selector.substring(1);
        elm.style.cssText = `

            height: ${this.height};
            width: ${this.width};
            background: ${this.bg};
            font-size: ${this.fontSize};
        `;
        // elm.style.fontSize = this.fontSize;
        elm.textContent = "Some string";
        document.body.appendChild(elm);
       
    } else if (this.selector.charAt(0) === "#") {

        let elm2 = document.createElement("p");
        elm2.id = this.selector.substring(1);
        elm2.style.cssText = `

            height: ${this.height};
            width: ${this.width};
            background: ${this.bg};
            font-size: ${this.fontSize};
        `;
        elm2.textContent = "Some string2";
        document.body.appendChild(elm2);
    } 
    else {
        alert ("Первый символ строки должен быть . или #. Повторите ввод.");
    }
};
element.createElm();
elementP.createElm();

