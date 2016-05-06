'use strict';

if (typeof Symbol == 'undefined') {
  require("babel-polyfill");
}

import DeepFramework from 'deep-framework';
import Handler from './Handler';

export default DeepFramework.LambdaHandler(Handler);
