/**
 * Created by AlexanderC on 9/18/15.
 */

'use strict';

import moduleName from '../name';

export class MainController {
  constructor($scope) {
    this._$scope = $scope;
    this._deepResource = DeepFramework.Kernel.get('resource');

    this.config = {
      loops: 2,
      interval: 500
    };

    this.resultsStack = {};
    this.loadingText = '';
    this.workingResource = null;
  }

  catchSubmit(resourceId) {
    let payload = {};

    this.workingResource = resourceId;
    this.resultsStack[resourceId] = [];
    this.loadingText = 'Loading...';

    this._invokeResource(resourceId, payload, this.config.loops, this.config.interval, (resourceRequests) => {
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

  _invokeResource(resourceId, payload, loops, intervalMs, callback) {
    let requestsStack = [];
    let resourceAction = this._deepResource.get(resourceId);
    let receivedResponses = 0;

    function execRequest(index = 0) {
        let requestInfo = {
          index: index,
          start: new Date().getTime(),
        };

        resourceAction.request(payload).send((response) => {
          receivedResponses++;

          requestInfo.stop = new Date().getTime();
          requestInfo.duration = requestInfo.stop - requestInfo.start;

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
        avg: durationArr.reduce((a, b) => a + b) / durationArr.length,
      };
    }

    return result;
  }
}

angular.module(moduleName).controller('MainController',
  ['$scope', function(...args) {
    return new MainController(...args);
  },]
);