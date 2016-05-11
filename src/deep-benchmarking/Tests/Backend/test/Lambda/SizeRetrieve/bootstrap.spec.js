// THIS TEST WAS GENERATED AUTOMATICALLY ON Fri May 06 2016 11:33:33 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/Lambda/SizeRetrieve/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in lambda-size module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
