function ConvertHandler() {
  //This method allows to get numeric part of the query param.
  this.getNum = function (input) {
    let result;
    const numRegex = /\d+(?:\.\d+)?/g;
    const operatorRegex = /([*\/+-]{1,}|(?<!\d)[*\/+-](?!\d))/g;
    const numMatch = input.match(numRegex);
    const operatorMatch = input.match(operatorRegex);
    if (numMatch) {
      if (operatorMatch) {
        if (operatorMatch[0] === '/') {
          console.log(1)
          if (numMatch.length > 2) {
            result = 'invalid number';
          } else if (numMatch.length === 2) {
            result = parseFloat(numMatch[0]) / parseFloat(numMatch[1]);
          }
        } else {
          return 'invalid number';
        }
      } else {
        result = parseFloat(numMatch[0]);
      }
    } else {
      result = 1;
    }
    return Number(result);
  };

  //This method allows to get the units in the query param.
  this.getUnit = function (input) {
    let result;
    const unitRegex = /\s*(mi|km|l|gal|lbs|kg)$/i;
    const match = input.match(unitRegex);
    if (match) {
      if (match[0] === 'L') {
        result = match[0];
      } else if (match[0] === 'l') {
        result = 'L';
      } else {
        result = match[0].toLowerCase().replace(/^\s+/, '');
      }
    } else {
      result = 'invalid unit';
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    if (initUnit === 'l' || initUnit === 'L') {
      result = 'gal';
    } else if (initUnit === 'gal') {
      result = 'L';
    } else if (initUnit === 'kg') {
      result = 'lbs';
    } else if (initUnit === 'lbs') {
      result = 'kg';
    } else if (initUnit === 'km') {
      result = 'mi';
    } else if (initUnit === 'mi') {
      result = 'km';
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    const units = {
      L: 'liters',
      km: 'kilometers',
      kg: 'kilograms',
      gal: 'gallons',
      mi: 'miles',
      lbs: 'pounds',
    };
    result = units[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initNum === 'invalid number') {
      return initNum;
    } else {
      if (initUnit === 'L' || initUnit === 'l') {
        result = initNum * 1 / galToL;
      } else if (initUnit === 'gal') {
        result = initNum * galToL;
      } else if (initUnit === 'kg') {
        result = initNum * 1 / lbsToKg;
      } else if (initUnit === 'lbs') {
        result = initNum * lbsToKg;
      } else if (initUnit === 'km') {
        result = initNum * 1 / miToKm;
      } else if (initUnit === 'mi') {
        result = initNum * miToKm;
      }
      return Number(result.toFixed(5));
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initUnit === 'invalid unit' ? initUnit : `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;
