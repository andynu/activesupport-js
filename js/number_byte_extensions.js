const NumberByteExtensions = {
  byte: function() { return this; },
  kilobyte: function() { return this * 1024; },
  megabyte: function() { return this * (1024).kilobyte(); },
  gigabyte: function() { return this * (1024).megabyte(); },
  terabyte: function() { return this * (1024).gigabyte(); },
  petabyte: function() { return this * (1024).terabyte(); },
  exabyte: function() { return this * (1024).petabyte(); }
}

// Pluralize method names
Object.getOwnPropertyNames(NumberByteExtensions).forEach(key => {
  NumberByteExtensions[`${key}s`] = NumberByteExtensions[key];
});

Object.assign(Number.prototype, NumberByteExtensions);

