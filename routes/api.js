'use strict';

const expect = require('chai').expect;
const express = require('express')
const ConvertHandler = require('../controllers/convertHandler.js');
const router = express.Router();


module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  router.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string,
    })
  });

  app.use(router);
};
