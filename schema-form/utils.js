const toStr = Object.prototype.toString;

// types
export const isObject = val => toStr.call(val) === '[object Object]';
export const isArray = val => toStr.call(val) === '[object Array]';
export const isString = val => toStr.call(val) === '[object String]';
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

// array
export const contains = (arr1, arr2) => {
  if (!isArray(arr1)) {
    return false;
  }

  if (!isArray(arr2)) {
    return arr1.indexOf(arr2) > -1;
  }
  return arr2.every(v => arr1.indexOf(v) > -1);
};

// string
export const ucfirst = (str = '') => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.substring(1);
};
