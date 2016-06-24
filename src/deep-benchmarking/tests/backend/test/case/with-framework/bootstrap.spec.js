'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/case/with-framework/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in with-framework module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
