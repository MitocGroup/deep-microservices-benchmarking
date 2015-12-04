/**
 * Created by AlexanderC on 9/18/15.
 */

'use strict';

import moduleName from '../name';

export class MainController {
  constructor($scope) {
    this._$scope = $scope;
    this._deepResource = DeepFramework.Kernel.get('resource');
  }

  catchSubmit(resourceId) {
    let payload = {};

    this._invokeResource(resourceId, payload, 10, 1000, (timeStack) => {
      this._$scope.data = JSON.stringify(timeStack, null, '  ');
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

  _invokeResource(resourceId, payload = {}, loops = 10, intervalMs = 1000, callback = () => {}) {
    let timeStack = {};
    let resourceAction = this._deepResource.get(resourceId);
    let receivedResponses = 0;

    function execRequest(index = 0) {
        let requestTime = {
          start: new Date().getTime()
        };

        resourceAction.request(payload).send((response) => {
          receivedResponses++;

          requestTime.stop = new Date().getTime();
          requestTime.duration = requestTime.stop - requestTime.start;

          timeStack['request_'+index] = requestTime;

          if (receivedResponses === loops) {
            callback(timeStack);
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