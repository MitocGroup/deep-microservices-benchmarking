/**
 * Created by AlexanderC on 9/18/15.
 */

'use strict';

import moduleName from '../name';

export class MainController {
  constructor($scope) {
    // @todo: inject this using ng DI
    this._helloResource = DeepFramework.Kernel.get('resource').get('@deep.lambda.benchmark:sample');
    this._$scope = $scope;

    this._$scope.catchSubmit = this.catchSubmit.bind(this);
  }

  catchSubmit() {
    let payload = {
      Name: this._$scope.name,
    };

    this._helloResource.request('say-hello', payload).send((response) => {
      this._$scope.data = JSON.stringify(response.data, null, '  ');
      this._$scope.$digest();
    });
  }
}

angular.module(moduleName).controller('MainController',
  ['$scope', function(...args) {
    return new MainController(...args);
  },]

);