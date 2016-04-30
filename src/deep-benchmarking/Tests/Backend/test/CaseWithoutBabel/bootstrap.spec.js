// THIS TEST WAS GENERATED AUTOMATICALLY ON Sat Apr 30 2016 12:36:30 GMT-0400 (EDT)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/without-babel/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in without-babel modules', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
