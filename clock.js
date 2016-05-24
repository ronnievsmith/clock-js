/*
clock.js v0.1 - Simple datetime add-on tools for JavaScript
Created by Ron Royston, https://rack.pub
https://github.com/rhroyston/clock-js
License: MIT

clock.now
clock.since(timestamp)
clock.until(timestamp)
clock.what.time(timestamp)
clock.unit.seconds
*/

//Revealing Module Pattern (Public & Private) w Public Namespace 'clock'
var clock = (function() {
    var weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    var months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    
    // object to expose as public properties and methods such as clock.now
    var pub = {};
    // instantiates public methods such as clock.what.day(timestamp)
    pub.what = new What;
    pub.unit = new Unit;

    //clock.now
    Object.defineProperty(pub, "now", {
        get: function () { 
            return Date.now();
        }
    });

    //clock.time
    Object.defineProperty(pub, "time", {
        get: function () {
            var d = new Date();
            var h = d.getHours();
            var m = ('0' + d.getMinutes()).slice(-2);
            if(h<12){
                return h + ':' + m + ' AM';
            } else {
                return (h - 12) + ':' + m + ' PM';
            }
        }
    });

    //clock.weekday
    Object.defineProperty(pub, "weekday", {
        get: function () {
            
            var d = new Date();
            for (var i = 0; i < weekdays.length; i++) {
                if( d.getDay() === i ){
                    return (weekdays[i]);
                }
            }
        }
    });
    
    //clock.day
    Object.defineProperty(pub, "day", {
        get: function () {
            return new Date().getDate();
        }
    });
    
    //clock.month
    Object.defineProperty(pub, "month", {
        get: function () {
            var d = new Date();
            for (var i = 0; i < months.length; i++) {
                if( d.getMonth() === i ){
                    return (months[i]);
                }
            }
        }
    });

    //clock.year
    Object.defineProperty(pub, "year", {
        get: function () {
            return new Date().getUTCFullYear();
        }
    });
    
    //clock.since
    pub.since = function (timestamp) {
        var ts = validate(timestamp);
        if(ts){
            var seconds = Math.floor((new Date() - ts) / 1000);
            return timeframe(seconds);
        }
    };
    
    //clock.until
    pub.until = function (timestamp) {
        var ts = validate(timestamp);
        if(ts){
            var seconds = Math.floor((ts - new Date()) / 1000);
            return timeframe(seconds);
        }
    };

    //Constructor for methods such as clock.what.day(timestamp)
    function What () {
        //clock.what.time(timestamp)
        this.time = function(timestamp) {
            var ts = validate(timestamp);
            if(ts){
                var d = new Date(ts);
                var h = d.getHours();
                var m = ('0' + d.getMinutes()).slice(-2);
                if(h<12){
                    return h + ':' + m + ' AM';
                } else {
                    return (h - 12) + ':' + m + ' PM';
                }
            }
        };
        
        //clock.what.weekday(timestamp)
        this.weekday = function(timestamp) {
            var ts = validate(timestamp);
            if(ts){
                var d = new Date(ts);
                for (var i = 0; i < weekdays.length; i++) {
                    if( d.getDay() === i ){
                        return (weekdays[i]);
                    }
                }                   
            }
        };
        
        //clock.what.day(timestamp)
        this.day = function(timestamp) {
            var ts = validate(timestamp);
            if(ts){
                return new Date(ts).getDate();
            }
        };

        //clock.what.month(timestamp)
        this.month = function(timestamp) {
            var ts = validate(timestamp);
            if(ts){
                var d = new Date(ts);
                for (var i = 0; i < months.length; i++) {
                    if( d.getMonth() === i ){
                        return (months[i]);
                    }
                }                  
            }
        };
        
        //clock.what.year(timestamp)
        this.year = function(timestamp) {
            var ts = validate(timestamp);
            if(ts){
                return new Date(ts).getUTCFullYear();
            }
        };
        
    } // end of Units Constructor
    
    //Constructor for methods such as clock.unit.day
    function Unit () {
        this.years = 1000 * 60 * 60 * 24 * 365;
        this.months = 1000 *60 *60 * 24 * 30.4167;
        this.weeks = 1000 * 60 * 60 * 24 * 7;
        this.days = 1000 * 60 * 60 * 24;
        this.hours = 1000 * 60 * 60;
        this.minutes = 1000 * 60;
        this.seconds = 1000;
    } // end of Units Constructor
    
    // private method
    function timeframe (seconds) {
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
    
    // private method
    function isValid(timestamp){
        var c = 'clock.js error';
        var expectedTimestamp = {name:c, message:'expected unix timestamp as argument'};
        var noStrings = {name:c, message:'string arguments not allowed; remove quotes from timestamp'};
        var noNulls = {name:c, message:'null argument disallowed; use clock.day to get current day'};
        var notadate = {name:c, message:'argument not a valid Date'};
        
        try {
            if(timestamp == null || timestamp == '') {
                //or simply return the current unit
                throw noNulls;
            }
            if (typeof timestamp == 'string') {
                if (/^\d+$/.test(timestamp)){ //all chars numbers
                    throw noStrings;
                } else {
                    throw expectedTimestamp;
                }
            }
            if (new Date(timestamp).getTime() <= 0) {
                throw notadate;
            }
            if (typeof timestamp !== 'number') {
                throw 'argument should be unix timestamp';
            }
            return true;
        }
        catch (e) {
            console.log(e.name + ' : ' + e.message);
        }
    }
    
    
    // private method
    function validate(timestamp){
        //Error Object Custom Properties
        var c = 'clock.js error';
        var expectedTimestamp = {name:c, message:'expected unix timestamp as argument'};
        
        try {
            if(timestamp == null || timestamp == '') {
                //return current timestamp
                return pub.now;
            }
            if (typeof timestamp == 'string') {
                //remove whitespace
                timestamp = timestamp.replace(/\s/g, '');
                //if all chars numbers
                if (/^\d+$/.test(timestamp)){
                    //convert to number
                    timestamp = Number(timestamp);
                } else {
                    throw expectedTimestamp;
                }
            }
            //if timestamp is valid
            if(new Date(timestamp).getTime() > 0){
                return timestamp;
            } else {
                throw expectedTimestamp;
            }
        }
        catch (e) {
            console.log(e.name + ' : ' + e.message);
            return null;
        }
    }    
    
    //API
    return pub;
}());
    
