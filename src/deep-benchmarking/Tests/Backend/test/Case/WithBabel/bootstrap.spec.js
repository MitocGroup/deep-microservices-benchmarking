// THIS TEST WAS GENERATED AUTOMATICALLY ON Fri May 06 2016 11:33:33 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/Case/WithBabel/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in with-babel module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});