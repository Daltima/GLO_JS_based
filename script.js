'use strict';

class First{
    constructor() {

    }
    hello() {
        console.log("Привет я метод родителя!");
    }
    
}

const firstPhrase = new First();


        
class Second extends First{          
    
        hello() {    
            firstPhrase.hello();   
            console.log("А я наследуемый метод!");
        }
    
}

const secondPhrase = new Second();

secondPhrase.hello();
