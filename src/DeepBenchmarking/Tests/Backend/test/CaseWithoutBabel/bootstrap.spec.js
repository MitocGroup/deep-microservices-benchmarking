// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 15:43:22 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../node_modules/CaseWithoutBabel/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in without-babel module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
