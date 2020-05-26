const REGEX = {
  phone: /^1\d{10}$/,
  card: /^.{18}$/,
  length: /^.{6,18}$/,
  verify: /^\d+$/
};
export const validator = function(method, val) {
  return REGEX[method].test(val);
};
export const hasEmpty = function(obj) {
  let hasEmpty = false;
  for (let key in obj) {
    if (obj[key] === "") {
      hasEmpty = true;
      break;
    }
  }
  return hasEmpty;
};
