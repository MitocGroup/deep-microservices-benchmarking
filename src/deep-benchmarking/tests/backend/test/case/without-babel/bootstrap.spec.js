'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/case/without-babel/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in without-babel module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
