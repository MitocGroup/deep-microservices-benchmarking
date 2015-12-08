/**
 * Created by AlexanderC on 9/18/15.
 */

'use strict';

import moduleName from '../name';

export class DeepBenchmarkMainController {
  constructor($scope, NgTableParams) {
    this._$scope = $scope;
    this._NgTableParams = NgTableParams;
    this._deepResource = DeepFramework.Kernel.get('resource');

    this.config = {
      loops: 2,
      interval: 500,
      gateway: this.GATEWAY_API,
    };

    this.resultsStack = {};
    this.payloads = {};
    this.errorText = '';
    this.loadingText = '';
    this.workingResource = null;
  }

  /**
   * @returns {string}
   */
  get GATEWAY_LAMBDA() {
    return 'lambda';
  }

  /**
   * @returns {string}
   */
  get GATEWAY_API() {
    return 'api';
  }

  catchSubmit(resourceId) {
    let payload = {};

    if (this.payloads.hasOwnProperty(resourceId)) {
      try {
        payload = eval(`(${this.payloads[resourceId]})`);
      } catch (e) {
        // @todo - remove error message when input is changed
        this.errorText = `Invalid payload. Make sure it's a valid JSON object`;
        return false;
      }
    }

    this.workingResource = resourceId;
    this.resultsStack[resourceId] = [];
    this.errorText = '';
    this.loadingText = 'Loading...';

    this._invokeResource(resourceId, payload, this.config, (resourceRequests) => {
      this.tableParams = new this._NgTableParams({}, {
        dataset: resourceRequests
      });

      this.resultsStack[resourceId] = resourceRequests;
      this.loadingText = `Result for "${resourceId}"`;
      this._$scope.$digest();
    });
  }

  get resources() {
    let resourcesStack = [];
    let deepResources = this._deepResource._resources;

    for (let msId in deepResources) {
      if (!deepResources.hasOwnProperty(msId)) {
        continue;
      }

      let msResources = deepResources[msId];

      for (let resourceId in msResources) {
        if (!msResources.hasOwnProperty(resourceId)) {
          continue;
        }

        let resourceActions = msResources[resourceId]._rawActions;

        for (let actionId in resourceActions) {
          if (!resourceActions.hasOwnProperty(actionId)) {
            continue;
          }

          resourcesStack.push(`@${msId}:${resourceId}:${actionId}`);
        }
      }
    }

    return resourcesStack;
  }

  _invokeResource(resourceId, payload, config, callback) {
    let loops = config.hasOwnProperty('loops') ? config.loops : 5;
    let intervalMs = config.hasOwnProperty('interval') ? config.interval : 500;
    let requestGateway = config.hasOwnProperty('gateway') ? config.gateway : this.GATEWAY_API;

    let requestsStack = [];
    let resourceAction = this._deepResource.get(resourceId);
    let receivedResponses = 0;
    let _this = this;

    function execRequest(index = 0) {
        let requestInfo = {
          index: index,
          start: new Date().getTime(),
        };

        let request = resourceAction.request(payload).disableCache();
        if (requestGateway === _this.GATEWAY_LAMBDA) {
          request.useDirectCall();
        }

        request.send((response) => {
          receivedResponses++;

          requestInfo.stop = new Date().getTime();
          requestInfo.duration = requestInfo.stop - requestInfo.start;
          requestInfo.internalDebug = !response.isError && response.data.hasOwnProperty('debug') ? response.data.debug : {};

          requestsStack.push(requestInfo);

          if (receivedResponses == loops) {
            callback(requestsStack);
          }
        });

        index++;

        if (index < loops) {
          setTimeout(function() {
            execRequest(index);
          }, intervalMs);
        }
    };

    execRequest();
  }

  /**
   * @param resourceId
   * @returns {{min: number, max: number, avg: number}}
   * @private
   */
  getResultsSummary(resourceId) {
    let results = this.resultsStack.hasOwnProperty(resourceId) ? this.resultsStack[resourceId] : {};
    let durationArr = [];

    for (let resultKey in results) {
      if (!results.hasOwnProperty(resultKey)) {
        continue;
      }

      let result = results[resultKey];

      durationArr.push(result.duration);
    }

    let result = null;
    if (durationArr.length) {
      result = {
        min: Math.min(...durationArr),
        max: Math.max(...durationArr),
        avg: Math.round(durationArr.reduce((a, b) => a + b) / durationArr.length),
      };
    }

    return result;
  }
}

angular.module(moduleName).controller('DeepBenchmarkMainController',
  ['$scope', 'NgTableParams', function(...args) {
    return new DeepBenchmarkMainController(...args);
  },]
);