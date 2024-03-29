class ActiveSupport {
  static Version = '0.1';

  static pluralize(count, singular) {
    return Math.abs(count) === 1 ? `${count} ${singular}` : `${count} ${singular}s`;
  }
}

var pluralize = ActiveSupport.pluralize;

// if window object defined
if (typeof window !== 'undefined') {
  window.pluralize = pluralize;
}

export { ActiveSupport, pluralize }