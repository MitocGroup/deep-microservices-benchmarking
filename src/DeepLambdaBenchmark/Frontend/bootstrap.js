'use strict';
'format es6';

export default function deepDeepLambdaBenchmark() {
  let scripts = [
    Promise.resolve(System.import('/deep.lambda.benchmark/js/config.system.js')),
    Promise.resolve(System.import('/deep.lambda.benchmark/js/app/angular/index.js')),
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