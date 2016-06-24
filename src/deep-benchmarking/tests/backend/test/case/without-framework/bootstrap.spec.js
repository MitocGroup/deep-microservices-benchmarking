'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/case/without-framework/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in without-framework module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
