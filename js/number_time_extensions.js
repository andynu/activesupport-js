const NumberTimeExtensions = {
  since: function(reference) { return new Date((reference || new Date()).getTime() + this); },
  until: function(reference) { return new Date((reference || new Date()).getTime() - this); },
  toDate: function() { return this.ago(); },
  fromNow: function() { return this.since(); },
  ago: function() { return this.until(); }
};

Object.assign(Number.prototype, NumberTimeExtensions);
