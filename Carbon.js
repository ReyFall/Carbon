/* Carbon library for JS v 0.0.1 */
"use strict";

class Carbon{
    constructor(date=new Date(), utc="UTC+3"){
        this.utc = utc;
        this.dateUNIX = Date.parse(date);
        this.monthsNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthsNamesRU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        this.format = "d-m-y h:mm:s";
    }

    now(){
        let date =  this.parseUNIX(Date.parse(new Date()));
        let format = this.format;
        format = format.replace("d", date.day);
        format = format.replace(/mm/, date.minutes);
        format = format.replace(/m/, date.month);
        format = format.replace("y", date.year);
        format = format.replace("h", date.hours);
        format = format.replace("s", date.seconds);
        return format;
    }
    todayStart(){
        let date =  this.parseUNIX(Date.parse(new Date()));
        let format = this.format;
        format = format.replace("d", date.day);
        format = format.replace(/mm/, "00");
        format = format.replace(/m/, date.month);
        format = format.replace("y", date.year);
        format = format.replace("h", "00");
        format = format.replace("s", "00");
        return format;
    }
    todayStartUNIX(){
        return this.todayStart();//
    }
    todayEnd(){
        let date =  this.parseUNIX(Date.parse(new Date()));
        let format = this.format;
        format = format.replace("d", date.day);
        format = format.replace(/mm/, "59");
        format = format.replace(/m/, date.month);
        format = format.replace("y", date.year);
        format = format.replace("h", "23");
        format = format.replace("s", "59");
        return format;
    }
    todayEndUNIX(){
        return this.todayEnd();//
    }
    secondsUntilEndOfDay(){
        console.log(this.todayEndUNIX(), this.dateUNIX);
        return this.dateDiff(this.todayEndUNIX(), "seconds");
    }

    parse(date){
        //
    }
    parseUNIX(dateUNIX){
        let date = new Date(dateUNIX);
        return {
            day: date.getDate() < 10 ? "0"+date.getDate() : date.getDate(),
            month: date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1,
            year: date.getFullYear(),
            hours: date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
            minutes: date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
            seconds: date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds(),
        };
    }

    getDate(){
        return this.butify();
    }
    startOfDay(){
        return this.butify("d-m-y 00:00:00");
    }
    endOfDay(){
        return this.butify("d-m-y 23:59:59");
    }
    addDay(amontDays=1){
        this.dateUNIX += amontDays * 86400000;
        return this;
    }
    addWeek(amontWeeks=1){
        this.dateUNIX += amontWeeks * 604800000;
        return this;
    }
    addMonth(amontMonths=1){///////////????
        this.dateUNIX += amontMonths * 2419200000;
        return this;
    }
    dateDiff(dateToDiff=Date.now(), type="days"){
        let diff = this.dateUNIX - dateToDiff;
        switch(type){
            case "years": return Number((diff/31536000000).toFixed(3));//365days
            case "months": return Number((diff/2592000000).toFixed(3));//30days
            case "weeks": return Number((diff/604800000).toFixed(3));
            case "hours": return Number((diff/3600000).toFixed(3));
            case "minutes": return Number((diff/60000).toFixed(3));
            case "seconds": return Number((diff/1000).toFixed(3));
            case "miliseconds": return diff;
            default: return Number((diff/86400000).toFixed(3));
        }
    }
    butify(format=this.format, monthNames=this.monthsNamesEN){
        let date = this.parseUNIX(this.dateUNIX);

        if(format === null || format.trim() === ""){
            format = this.format;
        }

        format = format.replace("d", date.day);
        format = format.replace(/mm/, date.minutes);
        format = format.replace(/m/, date.month);
        format = format.replace("y", date.year);
        format = format.replace("h", date.hours);
        format = format.replace("s", date.seconds);
        format = format.replace(/M/, monthNames[date.month-1]);
        
        return format;
    }
}