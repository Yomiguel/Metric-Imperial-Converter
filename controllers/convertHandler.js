function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    const numRegex = /^(\d+\.?\d*|\d*\.?\d+)(?:\/(\d+\.?\d*|\d*\.?\d+))?/;
    const match = input.match(numRegex);
    if (match[2]) {
      result = parseFloat(match[1]) / parseFloat(match[2]);
    } else {
      result = parseFloat(match[0]);
    };
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const unitRegex = /\s*(mi|km|l|gal|lb|kg)\s*$/i;
    const match = input.match(unitRegex);
    result = match[0].toLowerCase().replace(/^\s+/, '');
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
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
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
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };

}

module.exports = ConvertHandler;
