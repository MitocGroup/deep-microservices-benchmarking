// THIS TEST WAS GENERATED AUTOMATICALLY ON Tue May 03 2016 15:09:24 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import Handler from '../../node_modules/CaseWithoutFramework/Handler';

let expect = chai.expect;

// @todo: Add more advanced tests
suite('Handlers', () => {
  test('Class Handler exists in without-framework module', () => {
    expect(Handler).to.be.an('function');
  });
});
