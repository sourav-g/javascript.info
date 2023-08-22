//* What is epoch in computing [ 1st Jan 1970 UTC+0 ] ??

//! In a computing context, an epoch is the date and time relative to which a computer's clock and timestamp values are determined.

//! The epoch traditionally corresponds to 0 hours, 0 minutes, and 0 seconds (00:00:00) Coordinated Universal Time (UTC) on a specific date, which varies from system to system.

//! The current epoch of 1 January 1970 00:00:00 UTC (midnight) was selected arbitrarily by Unix engineers because it was considered a convenient date to work with.

//! IST == UTC +5.30

//? ----Creation--------------------------------------

//? new Date()

let date = new Date();

//? new Date(milliseconds) 
//! Date object with time equal to no. of milliseconds passed after 1st Jan 1970 UTC+0

// 0 means 01.01.1970 UTC+0

date = new Date(0);
console.log( date );   // 1970-01-01T00:00:00.000Z

// now add 24 hours, get 02.01.1970 UTC+0

date = new Date(24 * 3600 * 1000);
console.log( date );   // 1970-01-02T00:00:00.000Z


//* TIMESTAMP => An integer number representing the number of milliseconds that has passed since the beginning of 1970.



//? new Date(datestring)
date = new Date("2017-01-26");

//? new Date(year, month, date, hours, minutes, seconds, ms)
new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00

// Month : 0 (Jan) ->  11 (Dec).
// Date  : 1 -> 31
// Day   : 0 (Sun) -> 6 (Sat)


//? ----Access date components--------------------------------------


date.getDate();
date.getMonth();
date.getFullYear();
date.getHours();
date.getMinutes();
date.getSeconds();
date.getMilliseconds();
date.getDay();

//* All the methods above return the components relative to the local time zone.
//* There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0: getUTCFullYear(), getUTCMonth(), getUTCDay(). 

date.getTime();
date.getTimezoneOffset();

//? ----Setting date components--------------------------------------

/*

    setFullYear(year, [month], [date])
    setMonth(month, [date])
    setDate(date)
    setHours(hour, [min], [sec], [ms])
    setMinutes(min, [sec], [ms])
    setSeconds(sec, [ms])
    setMilliseconds(ms)
    setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)

*/

//? ----Autocorrection-----------------------------------------------

// Setting out-of-range values, gets AUTO-ADJUSTED by date object

//!            Month is 0 indexed, [ 0-Jan, 1-Feb, ...]
//                    |
date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log(date);  // 2013-01-31T18:30:00.000Z

date = new Date("2023-2-28");           
date.setDate(date.getDate()+2);         // increase by 2 days, leap year ??
console.log(date.toLocaleDateString()); // 2/3/2023
                
//? ----Date to number, date diff------------------------------------

// When a Date object is converted to number, it becomes the timestamp same as date.getTime():
// Dates can be subtracted, the result is their difference in ms.
// That can be used for time measurements:


date = new Date();
console.log(+date);

//? ----Date.now()------------------------------------------------

// If we only want to measure time, we don’t need the Date object.
// There’s a special method Date.now() that returns the current timestamp.


let start = Date.now(); // milliseconds count from 1 Jan 1970
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}
let end = Date.now(); // done

console.log( `The loop took ${end - start} ms` ); // subtract numbers, not dates

//? ----Benchmarking------------------------------------------------


//! Read later


//? ----Date.parse from a string------------------------------------

// The method Date.parse(str) can read a date from a string.
// The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ
// The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.

let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
console.log(ms);

date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
console.log(date);

//? -------------------------------------------------------------------------

date = new Date("2023-2-28"); 

console.log('----------------')
console.log(date);                  //  2023-02-27T18:30:00.000Z
console.log(date.toISOString());    //  2023-02-27T18:30:00.000Z
console.log(date.toUTCString());    //  Mon, 27 Feb 2023 18:30:00 GMT
console.log(date.valueOf());        //  1677522600000
console.log('----------------')

console.log(date.toString());      //   Tue Feb 28 2023 00:00:00 GMT+0530 (India Standard Time)
console.log(date.toDateString());  //   Tue Feb 28 2023
console.log(date.toTimeString());  //   00:00:00 GMT+0530 (India Standard Time)
console.log(date.toLocaleString());     //  28/2/2023, 12:00:00 am
console.log(date.toLocaleDateString());  // 28/2/2023
console.log(date.toLocaleTimeString());  // 12:00:00 am


//! https://dev.to/zachgoll/a-complete-guide-to-javascript-dates-and-why-your-date-is-off-by-1-day-fi1
//! https://tc39.es/proposal-temporal/docs/  *******