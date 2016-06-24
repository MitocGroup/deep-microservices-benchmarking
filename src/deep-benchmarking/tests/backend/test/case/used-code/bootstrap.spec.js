'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/case/used-code/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in used-code module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
