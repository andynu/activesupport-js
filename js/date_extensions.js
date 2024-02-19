import './inflections.js'
import './array_extensions.js'
import './number_interval_extensions.js'
import './number_time_extensions.js'
// Utils
const pluralize = (count, word) => 
  count === 1 ? word : `${word}s`;

// Date Extensions
const DateExtensions = {
  MONTHS: "January February March April May June July August September October November December".split(" "),
  ABBR_MONTHS: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
  WEEKDAYS: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
  ABBR_WEEKDAYS: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
  RELATIVE_DATE_OUTPUT: {
    today: "today",
    yesterday: "yesterday",
    tomorrow: "tomorrow",
    hour_format: "%H:%M, ",
    date_format: "%b %o",
    year_format: ", %Y"
  },
  RELATIVE_TIME_RANGES: {
    0:  "less than a minute",
    15: "#{pluralize(this, 'minute')}",
    25: "less than half an hour",
    35: "about half an hour",
    55: "less than an hour",
    65: "about an hour",
    85: "less than an hour and a half",
    95: "about an hour and a half",
    115: "less than 2 hours",
    125: "about 2 hours",
    145: "less than 2 hours and a half",
    155: "about 2 hours and a half",
    175: "less than 3 hours",
    185: "around 3 hours"
  },
  STRING_FORMATS: {
    "%a": function() { return Date.ABBR_WEEKDAYS[this.getDay()]; },
    "%A": function() { return Date.WEEKDAYS[this.getDay()]; },
    "%b": function() { return Date.ABBR_MONTHS[this.getMonth()]; },
    "%B": function() { return Date.MONTHS[this.getMonth()]; },
    "%c": function() { return this.toLocaleString(); },
    "%d": function() { return String(this.getDate()).padStart(2, '0'); },
    "%H": function() { return String(this.getHours()).padStart(2, '0'); },
    "%I": function() { return String(this.getHours() % 12).padStart(2, '0'); },
    "%j": function() { throw Error("not implemented"); },
    "%m": function() { return String(this.getMonth() + 1).padStart(2, '0'); },
    "%M": function() { return String(this.getMinutes()).padStart(2, '0'); },
    "%o": function() { return this.getDate().ordinalize(); },
    "%p": function() { return Math.floor(this.getHours() / 12) == 0 ? "AM" : "PM"; },
    "%P": function() { return Math.floor(this.getHours() / 12) == 0 ? "am" : "pm"; },
    "%S": function() { return new String(this.getSeconds()).padStart(2, '0'); },
    "%U": function() { throw Error("not implemented"); },
    "%W": function() { throw Error("not implemented"); },
    "%w": function() { return this.getDay(); },
    "%x": function() { throw Error("not implemented"); },
    "%X": function() { throw Error("not implemented"); },
    "%y": function() { return new String(this.getYear()).padStart(2,'0'); },
    "%Y": function() { return new String(this.getFullYear()).padStart(4, '0'); },
    "%Z": function() { throw Error("not implemented"); }
  },
  // now: function() { // This conflicts with a builtin.
  //   return new Date();
  // },
  today: function() {
    return new Date().atBeginningOfDay();
  },
  getMonthName: function(monthIndex) {
    return Date.MONTHS[monthIndex];
  },

  getDayName: function(dayIndex) {
    return Date.WEEKDAYS[dayIndex];
  },
  
  isLeapYear: function(date) {
    const year = date.getFullYear();

    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;

    return false;
  } 

}

Object.assign(Date, DateExtensions);

// Instance extensions  
Object.assign(Date.prototype, {

  equals: function(other) {
    return this.getFullYear() === other.getFullYear() &&
        this.getMonth() === other.getMonth() &&
        this.getDate() === other.getDate();
  },

  isLeapYear() {
    return Date.isLeapYear(this);
  },

  getMonthName() {
    return Date.getMonthName(this.getMonth()); 
  },

  getDayName() {
    return Date.getDayName(this.getDay());
  },

  getDaysInMonth: function() {
    switch (this.getMonth() + 1) {
      case 2:
        return this.isLeapYear() ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  },

  isToday: function() {
    return this.midnight().equals(new Date().midnight());
  },

  succ: function() {
    return (1).second().fromNow();
  },

  toFormattedString: function(fmt) {
    let str = fmt.replace(/%[a-z]/gi, code => {
      let func =  Date.STRING_FORMATS[code];
      if (typeof(func) == "function") {
        return func.bind(this)()
      }
    });
    str = str.replace(/%%/, "%");
    return str;
  },

  relativeDate: function() {
    var targetTime = this.atBeginningOfDay();
    var today = Date.today();

    if (targetTime.equals(today)) {
      return Date.RELATIVE_DATE_OUTPUT["today"];
    } else if (targetTime.equals(today.yesterday())) {
      return Date.RELATIVE_DATE_OUTPUT["yesterday"];
    } else if (targetTime.equals(today.tomorrow())) {
      return Date.RELATIVE_DATE_OUTPUT["tomorrow"];
    } else {
      var format = Date.RELATIVE_DATE_OUTPUT["date_format"];
      format += targetTime.getFullYear() == today.getFullYear() ? "" : Date.RELATIVE_DATE_OUTPUT["year_format"];
      return this.strftime(format);
    }
  },

  relativeTime: function(options = { prefix: "", suffix: "" }) {
    const distanceInMinutes = Math.round(Math.abs(Date.now() - this.getTime()) / 60000);
    const result = Object.entries(Date.RELATIVE_TIME_RANGES).find(([key, value]) => distanceInMinutes <= key);

    return result
        ? `${options.prefix} ${result[1].replace('#{this}', distanceInMinutes)} ${options.suffix}`.trim()
        : `${this.relativeDate()} at ${this.strftime('%H:%M')}`;
  },

  since(ms) {
    return ms.since(this);
  },
  ago: function(ms) {
    return this.since(-ms);
  },
  beginningOfDay: function() {
    let newDate = new Date(this);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },
  beginningOfWeek: function() {
    var daysToSunday = this.getDay() === 0 ? 6 : this.getDay() - 1;
    return daysToSunday.days().until(this.beginningOfDay());
  },
  beginningOfMonth: function() {
    let newDate = new Date(this.beginningOfDay());
    newDate.setDate(1);
    return newDate;
  },
  beginningOfQuarter: function() {
    let newDate = new Date(this.beginningOfMonth());
    newDate.setMonth([9, 6, 3, 0].find(m => m <= this.getMonth()));
    return newDate;
  },
  beginningOfYear: function() {
    let newDate = new Date(this.beginningOfMonth());
    newDate.setMonth(0);
    return newDate;
  },
  endOfDay: function() {
    let newDate = new Date(this);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  },
  endOfWeek: function() {
    return this.beginningOfWeek().since((1).week()).endOfDay();
  },
  endOfMonth: function() {
    let newDate = new Date(this.endOfDay());
    newDate.setDate(this.getDaysInMonth());
    return newDate;
  },
  endOfQuarter: function() {
    let targetMonth = [2, 5, 8, 11].find(m => m >= this.getMonth());
    let newDate = new Date(this.setMonth(targetMonth));
    return newDate.endOfMonth();
  },
  yesterday: function() {
    return new Date(this.getTime() - 24 * 60 * 60 * 1000);
  },
  tomorrow: function() {
    return new Date(this.getTime() + 24 * 60 * 60 * 1000);
  }
});


// ("setDate setMonth setFullYear setYear setHours setMinutes setSeconds setMilliseconds setTime").split(" ").forEach(function(method) {
//   Date.prototype[method + "WithoutChaining"] = Date.prototype[method];
//   Date.prototype[method] = function() {
//     this[method + "WithoutChaining"].call(this, Array.from(arguments));
//     return this;
//   }
// });

("beginningOfDay beginningOfWeek beginningOfMonth beginningOfQuarter beginningOfYear endOfDay endOfMonth endOfQuarter").split(" ").forEach(function(method) {
  Date.prototype["at" + method.charAt(0).toUpperCase() + method.substring(1)] = Date.prototype[method];
});


Date.prototype.strftime = Date.prototype.toFormattedString;
Date.prototype.midnight = Date.prototype.beginningOfDay;
Date.prototype.monday = Date.prototype.beginningOfWeek;

Date.WEEKDAYS.forEach(function(dayName, dayIndex) {
  Date.prototype["is" + dayName] = function() {
    return this.getDay() % 7 == dayIndex;
  }
});
