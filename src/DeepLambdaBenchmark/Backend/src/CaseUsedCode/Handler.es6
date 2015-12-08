'use strict';

import DeepFramework from 'deep-framework';

import db from 'deep-db';
import validation from 'deep-validation';
import core from 'deep-core';
import fs from 'deep-fs';
import security from 'deep-security';
import resource from 'deep-resource';
import joi from 'joi';
import vogels from 'vogels';
import aws from 'aws-sdk';
import babel from 'babel-polyfill';
import dynalite from 'dynalite';
import localdynamo from 'local-dynamo';

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

    // try to use smth from another version of framework
    let awsRegions = core.AWS.Region.list();

    this.createResponse({
      msg: `[${this._context.functionName}] Hello ${name}!`,
      awsRegions: awsRegions,
    }).send();
  }
}