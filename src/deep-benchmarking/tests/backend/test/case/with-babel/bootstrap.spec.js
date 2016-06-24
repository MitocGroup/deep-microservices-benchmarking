'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/case/with-babel/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in with-babel module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
