const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a number input.', () => {
        assert.equal(convertHandler.getNum('10L'), 10);
    }),
        test('convertHandler should correctly read a decimal number input.', () => {
            assert.equal(convertHandler.getNum('3.5gal'), 3.5);
        }),
        test('convertHandler should correctly read a fractional input.', () => {
            assert.equal(convertHandler.getNum('3/5km'), 3 / 5);
        }),
        test('convertHandler should correctly return an error on a double-fraction.', () => {
            assert.equal(convertHandler.getNum('3/5/7mi'), 'invalid number');
        }),
        test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
            assert.equal(convertHandler.getNum('lbs'), '1');
        }),
        test('convertHandler should correctly read each valid input unit.', () => {
            const validUnits = ['lbs', 'gal', 'mi', 'kg', 'L', 'km']
            assert.equal(convertHandler.getNum('lbs'), '1');
        })
});