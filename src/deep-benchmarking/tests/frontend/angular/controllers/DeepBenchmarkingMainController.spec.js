// THIS TEST WAS GENERATED AUTOMATICALLY ON 07/22/2016 15:50:15

'use strict';

import moduleName from '../../../../frontend/js/app/angular/name';

// @todo: Add more advanced tests
describe('Controllers', () => {

  let scope, rootScope;
  let $controller;
  let controller;

  beforeEach(() => {

    // Load modules
    module('ui.router');
    angular.mock.module(moduleName);

    // store references to scope, rootScope
    // so they are available to all tests in this describe block
    //
    // $controller service that is responsible for instantiating controllers
    // $rootScope ngMock’s service to allow getting an instance of angular’s core and create child scopes via its $new
    //
    // The underscores are a convenience trick to inject a service under a different name
    // so that we can locally assign a local variable of the same name as the service.
    inject((_$controller_, $rootScope) => {

      $controller = _$controller_;
      rootScope = $rootScope;
      scope = $rootScope.$new();

      //how to set model testedModelValue value for controller
      //scope.testedModelValue = null;
    });
  });

  /**
   * Sets ready for testing
   * @returns {HTMLDivElement}
   */
  function instantiateController() {
    scope.$digest();

    controller = $controller('DeepBenchmarkingMainController', {
      $scope: scope,
      $rootScope: rootScope,
    });

    scope.$digest();
  }

  //@todo - should be added controller's use cases by using "controller"
  describe('DeepBenchmarkingMainController', () => {
    it('Check DeepBenchmarkingMainController constructor', () => {
      let error = null;

      try {
        instantiateController();
      } catch (exception) {
        error = exception;
      }

      if (!error) {
        expect(typeof controller).toEqual('object');
      }
    });
  });
});
