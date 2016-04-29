// THIS TEST WAS GENERATED AUTOMATICALLY ON Fri Apr 29 2016 15:53:48 GMT-0400 (EDT)

'use strict';

import chai from 'chai';
import bootstrap from '../../../node_modules/with-framework/bootstrap';

// @todo: Add more advanced tests
suite('Bootstraps', () => {
  test(' bootstrap exists in with-framework modules', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
