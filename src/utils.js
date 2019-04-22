const toStr = Object.prototype.toString;

// types
export const isObject = val => toStr.call(val) === '[object Object]';
export const isArray = val => toStr.call(val) === '[object Array]';
export const isNumber = val => toStr.call(val) === '[object Number]';
export const isEmpty = val => {
  if (isObject(val)) {
    return !Object.keys(val).length;
  }
  if (isArray(val)) {
    return !val.length;
  }
  return Boolean(val) === false;
};

// string
export const ucfirst = (str = '') => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.substring(1);
};

export const noop = () => {};
