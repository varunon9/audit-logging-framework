/**
 * @key a column of Relational Database row (newData key)
 * @oldData old row data
 * @newData new row data
 */
const doesKeyValueMatchInData = (key, oldData, newData) => {
  if (oldData.hasOwnProperty(key)) {
    if (oldData[key] === newData[key]) {
      return true;
    }
    // key is available but value has changed
    return false;
  }
  
  // key is not available
  return false;
};

module.exports = {
  calculateDiff: (oldData, newData) => {
    // if oldData is {} i.e. row is newly created
    if (Object.keys(oldData).length === 0) {
      return newData;
    }

    const log = {};

    Object.keys(newData).forEach((key) => {
      if (!doesKeyValueMatchInData(key, oldData, newData)) {
        log[key] = newData[key];
      }
    });

    return log;
  }
};
