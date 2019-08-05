/* Carbon library for JS v 0.1.0 */
"use strict";

class Carbon{
    constructor(date=new Date(), format="yyyy-M-d h:m:s", utc="UTC+3"){
        this.utc = utc;
        this.dateUNIX = Date.parse(date);//////
        this.format = format;
        this.reference = {//2012.02.07 н.э. at 15:13:08 EET
            year: "yy",
            yearFull: "yyyy",
            month: "M",
            monthPart: "MM",
            monthName: "MMM",
            day: "d",
            hours: "h",
            minutes: "m",
            seconds: "s",
            miliseconds: "S",
            dayOfWeek: "w"
        };
        this.monthsNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthsNamesRU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    }

    now(){
        let date = this.parseUNIX(Date.parse(new Date()));
        let format = this.format;
        format = format.replace(this.reference.day, date.day);
        format = format.replace(this.reference.minutes, date.minutes);
        format = format.replace(this.reference.month, date.month);
        format = format.replace(this.reference.yearFull, date.year);
        format = format.replace(this.reference.hours, date.hours);
        format = format.replace(this.reference.seconds, date.seconds);
        return format;
    }
    todayStart(){
        let date =  this.parseUNIX(Date.parse(new Date()));
        let format = this.format;
        format = format.replace(this.reference.day, date.day);
        format = format.replace(this.reference.minutes, "00");
        format = format.replace(this.reference.month, date.month);
        format = format.replace(this.reference.yearFull, date.year);
        format = format.replace(this.reference.hours, "00");
        format = format.replace(this.reference.seconds, "00");
        return format;
    }
    todayStartUNIX(){
        return this.todayStart();//
    }
    todayEnd(){
        let date =  this.parseUNIX(Date.parse(new Date()));
        let format = this.format;
        format = format.replace(this.reference.day, date.day);
        format = format.replace(this.reference.minutes, "59");
        format = format.replace(this.reference.month, date.month);
        format = format.replace(this.reference.yearFull, date.year);
        format = format.replace(this.reference.hours, "23");
        format = format.replace(this.reference.seconds, "59");
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
            day: date.getDate() < 10 ? "0"+date.getDate() : ""+date.getDate(),
            month: date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : ""+date.getMonth()+1,
            year: ""+date.getFullYear(),
            hours: date.getHours() < 10 ? "0"+date.getHours() : ""+date.getHours(),
            minutes: date.getMinutes() < 10 ? "0"+date.getMinutes() : ""+date.getMinutes(),
            seconds: date.getSeconds() < 10 ? "0"+date.getSeconds() : ""+date.getSeconds(),
            miliseconds: date.getMilliseconds() < 10 ? "0"+date.getMilliseconds() : ""+date.getMilliseconds()
        };
    }

    getDate(){
        return this.butify();
    }
    startOfDay(){
        let date = this.parseUNIX(this.dateUNIX);
        this.dateUNIX = Date.parse(`${date.year}-${date.month}-${date.day} 00:00:00`);
        return this;
    }
    endOfDay(){
        let date = this.parseUNIX(this.dateUNIX);
        this.dateUNIX = Date.parse(`${date.year}-${date.month}-${date.day} 23:59:59`);
        return this;
    }
    startOfMonth(){///////////////////////test
        let date = this.parseUNIX(this.dateUNIX);
        this.dateUNIX = Date.parse(`${date.year}-${date.month}-01 ${date.hours}:${date.minutes}:${date.seconds}`);
        return this;
    }
    endOfMonth(){///////////////////////test
        let date = this.parseUNIX(this.dateUNIX);
        if(date.month === "12"){
            this.dateUNIX = Date.parse(`${Number(date.year)+1}-01-01 ${date.hours}:${date.minutes}:${date.seconds}`);
        }
        else{
            let month = Number(date.month)+1;
            month = month < 10 ? "0"+month : month;
            this.dateUNIX = Date.parse(`${date.year}-${month}-01 ${date.hours}:${date.minutes}:${date.seconds}`);
        }
        return this.addDay(-1);
    }

    addSecond(amontDays=1){
        this.dateUNIX += amontDays * 1000;
        return this;
    }
    addMinute(amontDays=1){
        this.dateUNIX += amontDays * 60000;
        return this;
    }
    addHour(amontDays=1){
        this.dateUNIX += amontDays * 3600000;
        return this;
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

        format = format.replace(this.reference.day, date.day);
        format = format.replace(this.reference.minutes, date.minutes);
        format = format.replace(this.reference.yearFull, date.year);
        format = format.replace(this.reference.year, date.year.substring(2));
        format = format.replace(this.reference.hours, date.hours);
        format = format.replace(this.reference.seconds, date.seconds);
        format = format.replace(this.reference.miliseconds, date.miliseconds);
        format = format.replace(this.reference.monthName, monthNames[date.month-1]);
        format = format.replace(this.reference.monthPart, monthNames[date.month-1].substring(0, 3));
        format = format.replace(this.reference.month, date.month);
        format = format.replace(this.reference.dayOfWeek, date.dayOfWeek);

        return format;
    }
}