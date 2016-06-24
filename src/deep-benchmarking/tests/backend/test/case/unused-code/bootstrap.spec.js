'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/case/unused-code/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in unused-code module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
