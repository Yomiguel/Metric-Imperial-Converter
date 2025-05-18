'use strict';

const expect = require('chai').expect;
const express = require('express')
const ConvertHandler = require('../controllers/convertHandler.js');
const router = express.Router();


module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  router.get('/api/convert', (req, res) => {
    try {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      if (initUnit === 'invalid unit' && initNum === 'invalid number') {
        res.send(`${initNum} and unit`);
      } else if (initUnit === 'invalid unit') {
        res.send(`${initUnit}`);
      } else if (initNum === 'invalid number') {
        res.send(`${initNum}`)
      } else {
        const returnNum = convertHandler.convert(initNum, initUnit);
        const returnUnit = convertHandler.getReturnUnit(initUnit);
        const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        res.json({
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: string,
        });
      }
    } catch (error) {
      console.error('Error in /api/convert:', error);
      res.status(501).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while processing your request'
      });
    }
  });
  app.use(router);
};
