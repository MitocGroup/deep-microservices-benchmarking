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

    this.requests = [];
    this.loadingText = '';
  }

  catchSubmit(resourceId) {
    let payload = {};
    this.requests = [];
    this.loadingText = 'Loading...';

    this._invokeResource(resourceId, payload, this.config.loops, this.config.interval, (requestsStack) => {
      this.loadingText = `Result for "${resourceId}"`;
      this.requests = requestsStack;
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
}

angular.module(moduleName).controller('MainController',
  ['$scope', function(...args) {
    return new MainController(...args);
  },]
);