'use strict';
'format es6';

export default function deepDeepLambdaBenchmark() {
  return System.import('/deep.lambda.benchmark/js/app/angular/index.js');
}

export function configLoad() {
  return new Promise((resolve, reject) => {
    let deepSecurity = DeepFramework.Kernel.get('security');

    deepSecurity.anonymousLogin((token) => {
      resolve(token);
    });
  });
}