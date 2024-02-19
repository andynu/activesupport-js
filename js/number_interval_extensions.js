const NumberIntervalExtensions = {
  second: function() { return this * 1000; },
  minute: function() { return this.second() * 60; },
  hour: function() { return this.minute() * 60; },
  day: function() { return this.hour() * 24; },
  week: function() { return this.day() * 7; },
  fortnight: function() { return this.week() * 2; },
  month: function() { return this.day() * 30; },
  year: function() { return this.month() * 12; }
}

// Pluralize methods
Object.getOwnPropertyNames(NumberIntervalExtensions).forEach(key => {
  NumberIntervalExtensions[`${key}s`] = NumberIntervalExtensions[key];
});

Object.assign(Number.prototype, NumberIntervalExtensions);
