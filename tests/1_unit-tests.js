const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a number input.', () => {
        assert.equal(convertHandler.getNum('10L'), 10);
        assert.equal(convertHandler.getNum('1mi'), 1);
        assert.equal(convertHandler.getNum('35km'), 35);
    }),
        test('convertHandler should correctly read a decimal number input.', () => {
            assert.equal(convertHandler.getNum('3.5gal'), 3.5);
            assert.equal(convertHandler.getNum('4.5l'), 4.5);
            assert.equal(convertHandler.getNum('2.11km'), 2.11);
        }),
        test('convertHandler should correctly read a fractional input.', () => {
            assert.equal(convertHandler.getNum('3/5km'), 3 / 5);
            assert.equal(convertHandler.getNum('5/3km'), 5 / 3);
        }),
        test('convertHandler should correctly read a fractional input with a decimal.', () => {
            assert.equal(convertHandler.getNum('3.5/5.2km'), 3.5 / 5.2);
            assert.equal(convertHandler.getNum('5.2/3.5km'), 5.2 / 3.5);
        }),
        test('convertHandler should correctly return an error on a double-fraction.', () => {
            assert.equal(convertHandler.getNum('3/5/7mi'), 'invalid number');
        }),
        test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
            assert.equal(convertHandler.getNum('lbs'), '1');
            assert.equal(convertHandler.getNum('km'), '1');
            assert.equal(convertHandler.getNum('l'), '1');
            assert.equal(convertHandler.getNum('gal'), '1');
        }),
        test('convertHandler should correctly read each valid input unit.', () => {
            assert.equal(convertHandler.getUnit('lbs'), 'lbs');
            assert.equal(convertHandler.getUnit('8gal'), 'gal');
            assert.equal(convertHandler.getUnit('15/3km'), 'km');
            assert.equal(convertHandler.getUnit('7.3mi'), 'mi');
            assert.equal(convertHandler.getUnit('4.5L'), 'L');
            assert.equal(convertHandler.getUnit('1kg'), 'kg');
        }),
        test('convertHandler should correctly return an error for an invalid input unit.', () => {
            assert.equal(convertHandler.getUnit('lb'), 'invalid unit');
            assert.equal(convertHandler.getUnit('3mis'), 'invalid unit');
            assert.equal(convertHandler.getUnit('3.7lo'), 'invalid unit');
        }),
        test('convertHandler should return the correct return unit for each valid input unit.', () => {
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
            assert.equal(convertHandler.getReturnUnit('l'), 'gal');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        }),
        test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
            assert.equal(convertHandler.spellOutUnit('L'), 'liters');
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        }),
        test('convertHandler should correctly convert gal to L.', () => {
            assert.equal(convertHandler.convert(5, 'gal'), 18.92705);
            assert.equal(convertHandler.convert(3.5, 'gal'), 13.24894);
            assert.equal(convertHandler.convert(1 / 2, 'gal'), 1.89271);
        }),
        test('convertHandler should correctly convert L to gal.', () => {
            assert.equal(convertHandler.convert(5, 'L'), 1.32086);
            assert.equal(convertHandler.convert(3.5, 'L'), 0.9246);
            assert.equal(convertHandler.convert(1 / 2, 'l'), 0.13209);
        }),
        test('convertHandler should correctly convert mi to km.', () => {
            assert.equal(convertHandler.convert(5, 'km'), 3.10686);
            assert.equal(convertHandler.convert(3.5, 'km'), 2.1748);
            assert.equal(convertHandler.convert(1 / 2, 'km'), 0.31069);
        }),
        test('convertHandler should correctly convert km to mi.', () => {
            assert.equal(convertHandler.convert(5, 'mi'), 8.0467);
            assert.equal(convertHandler.convert(3.5, 'mi'), 5.63269);
            assert.equal(convertHandler.convert(1 / 2, 'mi'), 0.80467);
        }),
        test('convertHandler should correctly convert lbs to kg.', () => {
            assert.equal(convertHandler.convert(5, 'lbs'), 2.26796);
            assert.equal(convertHandler.convert(3.5, 'lbs'), 1.58757);
            assert.equal(convertHandler.convert(1 / 2, 'lbs'), 0.2268);
        }),
        test('convertHandler should correctly convert kg to lbs.', () => {
            assert.equal(convertHandler.convert(5, 'kg'), 11.02312);
            assert.equal(convertHandler.convert(3.5, 'kg'), 7.71619);
            assert.equal(convertHandler.convert(1 / 2, 'kg'), 1.10231);
        })
});