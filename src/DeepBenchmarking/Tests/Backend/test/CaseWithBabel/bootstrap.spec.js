// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 15:09:24 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../node_modules/CaseWithBabel/bootstrap';

let expect = chai.expect;

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in with-babel module', () => {
    expect(bootstrap).to.be.an('object');
  });
});
