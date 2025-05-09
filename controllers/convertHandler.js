function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    const numRegex = /\d+(?:\.\d+)?/g;
    const match = input.match(numRegex);
    if (match) {
      if (match.length > 2) {
        result = 'invalid number';
      } else if (match.length === 2) {
        result = parseFloat(match[0]) / parseFloat(match[1]);
      } else if (match.length === 1) {
        result = parseFloat(match[0]);
      }
    } else {
      result = 1;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const unitRegex = /\s*(mi|km|l|gal|lbs|kg)\s*$/i;
    const match = input.match(unitRegex);
    result = match ? match[0].toLowerCase().replace(/^\s+/, '') : '';
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    if (initUnit === 'l') {
      result = 'gal';
    } else if (initUnit === 'gal') {
      result = 'l';
    } else if (initUnit === 'kg') {
      result = 'lbs';
    } else if (initUnit === 'lbs') {
      result = 'kg';
    } else if (initUnit === 'km') {
      result = 'mi';
    } else if (initUnit === 'mi') {
      result = 'km';
    } else {
      result = 'invalid unit';
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    const units = {
      l: 'liters',
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
      if (initUnit === 'l') {
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
      return result;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initUnit === 'invalid unit' ? initUnit : `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;
