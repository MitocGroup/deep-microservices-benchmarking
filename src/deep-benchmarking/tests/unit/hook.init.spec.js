'use strict';

const hookInit = require('../../hook.init');

describe('Check hook.init', () => {
  it('Test hook.init to be executable', done => {
    hookInit(function() {
      done();
    });
  });
});
