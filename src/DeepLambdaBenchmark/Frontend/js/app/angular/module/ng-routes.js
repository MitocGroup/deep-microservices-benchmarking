'use strict';
'format es6';

var deepAsset = DeepFramework.Kernel.get('asset');

export default {
  'DeepBenchmarkMain': {
    url: '/deep-benchmark',
    controller: 'DeepBenchmarkMainController',
    controllerAs: 'main',
    templateUrl: deepAsset.locate('@deep.lambda.benchmark:js/app/angular/views/main.html'),
    data: {
      pageTitle: 'Benchmarking',
    },
  },
};
