'use strict';

import DeepFramework from 'deep-framework';
import vogels from 'vogels';
import joi from 'joi';
import aws from 'aws-sdk';
import chai from 'chai';
import sinon from 'sinon';
import sinon_chai from 'sinon-chai';
import ioredis from 'ioredis';
import store from 'store';
import fs_extra from 'fs-extra';
import superagent from 'superagent';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {*} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param {Object} request
   */
  handle(request) {
    let name = request.getParam('Name', 'World');

    this.createResponse({
      msg: `[${this._context.functionName}] Hello ${name}!`
    }).send();
  }
}