'use strict';
'format es6';

/*eslint no-unused-vars: [0] */

import routes from './ng-routes';

export default ['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    angular.forEach(Object.keys(routes), function routesRegister(stateName) {
      $stateProvider.state(stateName, routes[stateName]);
    });
  },
];
