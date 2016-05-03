// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 15:09:24 GMT+0300 (EEST)

'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _Handler = require('../../node_modules/CaseUnusedCode/Handler');

var _Handler2 = _interopRequireDefault(_Handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let expect = _chai2.default.expect;

// @todo: Add more advanced tests
suite('Handlers', () => {
  test('Class Handler exists in unused-code module', () => {
    expect(_Handler2.default).to.be.an('function');
  });
});