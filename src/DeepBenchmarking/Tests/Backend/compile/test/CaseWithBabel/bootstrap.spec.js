// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 15:09:24 GMT+0300 (EEST)

'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _bootstrap = require('../../node_modules/CaseWithBabel/bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let expect = _chai2.default.expect;

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in with-babel module', () => {
    expect(_bootstrap2.default).to.be.an('object');
  });
});