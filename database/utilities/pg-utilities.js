const pgConstants = require('../pg-constants');

// Takes a number and returns a string of pg params up to that numer
const createParamsStr = (limit) => {
  let paramsStr = '';

  for (let i = 1; i < limit + 1; i++) {
    if (i === limit) {
      paramsStr = `${paramsStr} $${i}`;
    } else {
      paramsStr = `${paramsStr} $${i}, `;
    }
  }

  return paramsStr;
};

// Takes in a count of params and creates the 'VALUES' parameters string
const createValuesParams = (count) => {
  const { VALUES } = pgConstants;

  return `${VALUES} (${createParamsStr(count)})`;
};

module.exports = {
  createParamsStr, createValuesParams
};
