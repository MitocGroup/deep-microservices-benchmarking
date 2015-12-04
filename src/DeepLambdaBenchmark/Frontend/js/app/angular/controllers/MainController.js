/**
 * Created by AlexanderC on 9/18/15.
 */

'use strict';

import moduleName from '../name';

export class MainController {
  constructor($scope) {
    // @todo: inject this using ng DI
    this._deepResource = DeepFramework.Kernel.get('resource');
    this._helloResource = DeepFramework.Kernel.get('resource').get('@deep.lambda.benchmark:sample');
    this._$scope = $scope;

    this._$scope.catchSubmit = this.catchSubmit.bind(this);
  }

  catchSubmit() {
    let payload = {
      Name: this._$scope.name
    };

    this._invokeResource('@deep.lambda.benchmark:sample:say-hello', payload, 10, 500, (timeStack) => {
      this._$scope.data = JSON.stringify(timeStack, null, '  ');
      this._$scope.$digest();
    });
  }

  _invokeResource(resourceId, payload = {}, loops = 10, intervalMs = 1000, callback = () => {}) {
    let timeStack = {};
    let resourceAction = this._deepResource.get(resourceId);
    let receivedResponses = 0;

    function execRequest(index = 0) {
        let requestTime = {
          start: new Date().getTime()
        };

        let time = new Date().toISOString();

        console.log(`Request ${index} started at ${time}`);

        resourceAction.request(payload).send((response) => {
          receivedResponses++;

          requestTime.stop = new Date().getTime();
          requestTime.duration = requestTime.stop - requestTime.start;

          timeStack['request_'+index] = requestTime;

          console.log(`Request ${index} stopped.`);

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