window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //Таймер
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),//получаем конечную дату отсчёта в милисекундах 
            dateNow = new Date().getTime(),//получаем текущую дату в милисекундах
            timeRemaining = (dateStop - dateNow) / 1000,//получаем разницу между датами в секундах
            seconds = Math.floor(timeRemaining % 60),//получаем число секунд для спана таймера (секунды)(% - остаток от деления)
            minutes = Math.floor((timeRemaining / 60) % 60), //получаем число минут для спана таймера (минуты)
            hours = Math.floor(timeRemaining / 60 / 60);

            return {timeRemaining, hours, minutes, seconds};
        }   
        function updateClock() {
            let timer = getTimeRemaining();

            //Выводим данные таймера на экран
            if(timer.hours >= 0 && timer.hours < 10) {
                timerHours.textContent = '0' + timer.hours;
            } else {
                timerHours.textContent = timer.hours;
            }
            if(timer.minutes >= 0 && timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            } else {
                timerMinutes.textContent = timer.minutes;
            }
            if(timer.seconds >= 0 && timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            } else {
                timerSeconds.textContent = timer.seconds;
            } 
            //Исключаем отрицательные значения таймера  
            if(timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
                
        } 

        updateClock();
    }

    countTimer('08 june 2021');
    


});