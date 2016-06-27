'use strict';
'format es6';

var deepAsset = DeepFramework.Kernel.get('asset');

export default {
  'DeepBenchmarkingMain': {
    url: '/deep-benchmarking',
    controller: 'DeepBenchmarkingMainController',
    controllerAs: 'main',
    templateUrl: deepAsset.locate('@deep-benchmarking:js/app/angular/views/main.html'),
    data: {
      pageTitle: 'Benchmarking',
    },
  },
};
