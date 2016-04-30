'use strict';
'format es6';

export default function deepBenchmarking() {
  let deepAsset = DeepFramework.Kernel.get('asset');

  let scripts = [
    Promise.resolve(System.import(deepAsset.locate('@deep-benchmarking:js/config.system.js'))),
    Promise.resolve(System.import(deepAsset.locate('@deep-benchmarking:js/app/angular/index.js'))),
  ];

  return Promise.all(scripts);
}

export function configLoad() {
  return new Promise((resolve, reject) => {
    let deepSecurity = DeepFramework.Kernel.get('security');

    deepSecurity.anonymousLogin((token) => {
      resolve(token);
    });
  });
}