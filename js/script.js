'use strict';

const collections = document.querySelectorAll('.books'),
    book = document.querySelectorAll('.book'),
    bookA = document.querySelectorAll('a'),
    adv = document.querySelectorAll('.adv');
    
collections[0].prepend(book[1]);
collections[0].append(book[2]);
book[3].before(book[4]);

document.body.style.backgroundImage = 'url(./image/adv.jpg)';
console.log('bookA: ', bookA);
bookA[4].textContent = 'Книга 3. this и Прототипы Объектов';

adv[0].remove();

const bookLi = document.getElementsByTagName('li')[55],
    liClone = bookLi.cloneNode();
liClone.textContent = 'Глава 8: За пределами ES6';
bookLi.after(liClone);
const booksLi = document.querySelectorAll('li');

//organizing Book2
const chapterC = document.getElementsByTagName('li')[8],
    chapter1 = document.getElementsByTagName('li')[9],
    chapter4 = document.getElementsByTagName('li')[10],
    chapter5 = document.getElementsByTagName('li')[11],
    chapter2 = document.getElementsByTagName('li')[12],
    chapterA = document.getElementsByTagName('li')[13],
    chapter3 = document.getElementsByTagName('li')[14],
    chapterB = document.getElementsByTagName('li')[15],
    chapterD = document.getElementsByTagName('li')[16];

chapterD.before(chapterC);
chapterB.before(chapterA);
chapter3.after(chapter4);
chapter4.after(chapter5);

//organizing Book5
const chapter54 = document.getElementsByTagName('li')[38],
    chapter52 = document.getElementsByTagName('li')[39],
    chapter53 = document.getElementsByTagName('li')[40],
    chapter5A = document.getElementsByTagName('li')[41],
    chapter55 = document.getElementsByTagName('li')[42],
    chapter56 = document.getElementsByTagName('li')[43],
    chapter5B = document.getElementsByTagName('li')[44],
    chapter51 = document.getElementsByTagName('li')[45],
    chapter5C = document.getElementsByTagName('li')[46];

chapter54.before(chapter51);
chapter5B.before(chapter5A);
chapter53.after(chapter54);
