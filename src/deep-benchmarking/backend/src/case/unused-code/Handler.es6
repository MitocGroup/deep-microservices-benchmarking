'use strict';

import DeepFramework from 'deep-framework';

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