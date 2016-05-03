'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _nodeDir = require('node-dir');

var _nodeDir2 = _interopRequireDefault(_nodeDir);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Exec = require('../../../node_modules/deepify/lib.compiled/Helpers/Exec');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let expect = _chai2.default.expect;

suite('Functional tests', () => {

  let inputEventsArray = [];
  let inputEventsFilesArray = [];
  let expectedResultsArray = [];
  let expectedResultsFilesArray = [];
  let i = 0;

  suiteSetup(done => {

    const TEST_ASSERTS_DIR = '../../../test/LambdaSizeRetrieve/test-asserts';
    let dirPath = _path2.default.join(__dirname, TEST_ASSERTS_DIR);

    _nodeDir2.default.readFiles(dirPath, {
      match: /result.json$/,
      exclude: /^\./
    }, (err, content, next) => {
      if (err) throw err;
      expectedResultsArray.push(content);
      next();
    }, (err, files) => {
      if (err) throw err;
      expectedResultsFilesArray = files;
    });

    _nodeDir2.default.readFiles(dirPath, {
      match: /payload.json$/,
      exclude: /^\./
    }, (err, content, next) => {
      if (err) throw err;
      inputEventsArray.push(content);
      next();
    }, (err, files) => {
      if (err) throw err;
      inputEventsFilesArray = files;
      done();
    });
  });

  test('Check relevant of data', () => {
    for (i = 0; i < inputEventsFilesArray.length; i++) {
      expect(inputEventsFilesArray[i].replace('payload.json', '')).to.equal(expectedResultsFilesArray[i].replace('result.json', ''));
    }
  });

  test('Check lambdas', () => {

    for (i = 0; i < inputEventsArray.length; i++) {
      let eventStr = '\'' + inputEventsArray[i].replace(/(\r\n|\n|\r)/gm, '') + '\'';
      let cmd = `deepify run-lambda ../../../node_modules/lambda-size/ -e=${ eventStr } -p`;
      let runLambdaCmd = new _Exec.Exec(cmd);

      runLambdaCmd.cwd = __dirname;

      let lambdaResult = runLambdaCmd.runSync();
      let expectedResult = JSON.parse(expectedResultsArray[i]);
      let actualResult = lambdaResult.failed ? JSON.parse(lambdaResult.error) : JSON.parse(lambdaResult.result);

      expect(actualResult).to.eql(expectedResult, `for payload from: ${ inputEventsFilesArray[i] }`);
    }
  });
});