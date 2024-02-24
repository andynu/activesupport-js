class ActiveSupport {
  static Version = '0.1';

  static pluralizeMethods(module) {
    Object.entries(module).forEach(([key, value]) => {
      module[`${key}s`] = value;
    });
  }

  static pluralize(count, singular) {
    return Math.abs(count) === 1 ? `${count} ${singular}` : `${count} ${singular}s`;
  }
}

window.pluralize = ActiveSupport.pluralize;