window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //Определяем день недели
    window.setInterval(function(){

        let date = new Date(),
            
            day = document.getElementById("dayOfWeek"),
            dayOfWeek = ["Воскресение","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
            days = date.getDay();
        
            day.innerHTML = dayOfWeek[days];
    });
    // Часы с текущим временем + дни до НГ
    window.setInterval(function(){
        let now = new Date(),
            countDownDate = new Date("Jan 01, 2022 00:00:00").getTime(),
            distance = countDownDate - now,
            days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000),
            clock = document.getElementById("clock"),
            timerDays = document.querySelector('#timer-days');

       
        clock.innerHTML = now.toLocaleTimeString('en-US');
        timerDays.innerHTML = days;

    },1000);
    //Получаем время дня(утро, день, вечер,ночь) и выводим на экран
    let now = new Date(),
        dayHours = now.getHours(),
        dayTime = document.querySelector('#dayTime');

    if (dayHours <= 5 && dayHours <= 11) {
        dayTime.textContent = "Доброе утро";
    }
    else if (dayHours > 11 && dayHours <= 16) {   
        dayTime.textContent  = "Добрый день";
    }
    else if (dayHours > 16 && dayHours <= 22){
        dayTime.textContent  = "Добрый вечер";
    }
    else {
        dayTime.textContent = "Доброй ночи";
    }
});
