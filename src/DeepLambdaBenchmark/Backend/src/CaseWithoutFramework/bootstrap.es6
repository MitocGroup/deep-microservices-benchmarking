'use strict';

import FileSystem from 'fs';
import Handler from './Handler';

export default {
  handler: (event, context) => {
    let debug = {};
    let startLoadingConfig = new Date().getTime();

    let jsonFile = '_config.json';

    FileSystem.readFile(jsonFile, 'utf8', (error, data) => {
      if (error) {
        context.fail(`Failed to load app config file ${jsonFile}. ${error}`);
        return;
      }

      let stopLoadingConfig = new Date().getTime();
      debug.appConfigLoad = stopLoadingConfig - startLoadingConfig;
      context.debug = debug; // pass parameter into handler

      new Handler(JSON.parse(data), event, context).run();
    });
  },
};
