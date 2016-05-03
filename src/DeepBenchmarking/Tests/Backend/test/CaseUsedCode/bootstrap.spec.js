// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 15:31:04 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../node_modules/CaseUsedCode/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in used-code module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
