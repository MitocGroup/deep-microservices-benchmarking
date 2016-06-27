'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/lambda/size-retrieve/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in lambda-size module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
