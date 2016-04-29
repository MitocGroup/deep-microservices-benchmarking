'use strict';

import DeepFramework from 'deep-framework';
import Handler from './Handler';

export default {
  handler: (event, context) => {
    let debug = {};
    let startKernelLoad = new Date().getTime();

    DeepFramework.KernelFromLambdaContext(context).bootstrap((deepKernel) => {
        let stopKernelLoad = new Date().getTime();
        debug.kernelLoad = stopKernelLoad - startKernelLoad;

        context.debug = debug; // pass parameter into handler

        new Handler(deepKernel).run(event, context);
    });
  },
};
