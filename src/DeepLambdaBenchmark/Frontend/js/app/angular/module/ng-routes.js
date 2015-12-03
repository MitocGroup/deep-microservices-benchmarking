'use strict';
'format es6';

var deepAsset = DeepFramework.Kernel.get('asset');

export default {
  'main': {
    url: '/',
    controller: 'MainController',
    controllerAs: 'main',
    templateUrl: deepAsset.locate('@deep.lambda.benchmark:js/app/angular/views/main.html'),
    data: {
      pageTitle: 'Lambda Benchmark',
    },
  },
};
