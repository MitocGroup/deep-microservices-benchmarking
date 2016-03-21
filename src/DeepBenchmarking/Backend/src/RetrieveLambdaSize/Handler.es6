'use strict';

import DeepFramework from 'deep-framework';
import AWS from 'aws-sdk';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  constructor(...args) {
    super(...args);

    this._lambdaService = new AWS.Lambda();
  }

  /**
   * @param {{FunctionList:[]}} request
   */
  handle(request) {
    let functionList = request.FunctionList;
    let sizeMap = {};

    for (let index in functionList) {
      if (!functionList.hasOwnProperty(index)) {
        continue;
      }

      let functionName = functionList[index];

      setTimeout(() => {
        let payload = {
          FunctionName: functionName
        };

        this._lambdaService.getFunctionConfiguration(payload, (error, data) => {
          if (error) {
            this.createError(error).send();

            return;
          }

          sizeMap[functionName] = data.CodeSize;

          if (Object.keys(sizeMap).length === functionList.length) {
            this.createResponse({
              sizeMap: sizeMap,
            }).send();
          }
        });
      }, index * this.REQUEST_INTERVAL);
    }
  }

  /**
   * @returns {Function}
   */
  get validationSchema() {
    return (Joi) => {
      return Joi.object().keys({
        FunctionList: Joi.array().includes(Joi.string().required()).required()
      });
    }
  }

  /**
   * @returns {number}
   */
  get REQUEST_INTERVAL() {
    return 200;
  }
}
