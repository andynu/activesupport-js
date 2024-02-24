
function interpolate(template, replacements) {
  return template.replace(/#{([^}]+)}/g, (_, key) => replacements[key.trim()]);
}

String.prototype.interpolate = function() {
    return interpolate(this, ...arguments);
}
const $Q = (string, binding) => {
  const context = typeof window !== 'undefined' ? window : {};
  return string.interpolate(binding || context);
};

export { $Q, interpolate }