'use strict';

import DeepFramework from 'deep-framework';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {
  /**
   * @param {*} args
   */
  constructor(...args) {
    super(...args);
  }

  /**
   * @param {Object} request
   */
  handle(request) {
    let debug = this._context.hasOwnProperty('debug') ? this._context.debug : {};
    let payload = {
      Name: request.getParam('Name', 'World'),
    };

    let startWriteToFs = new Date().getTime();

    this.persistPayloadInFs(payload, (error, createdFile) => {
      let stopWriteToFs = new Date().getTime();

      debug.writeToS3 = stopWriteToFs - startWriteToFs;

      if (error) {
        return this.createError(error).send();
      }

      let startWriteToDb = new Date().getTime();

      this.persistPayloadInDb(payload, (error, NameModel) => {
        let stopWriteToDb = new Date().getTime();

        if (error) {
          return this.createError(error).send();
        }

        debug.writeToDb = stopWriteToDb - startWriteToDb;

        this.createResponse({
          msg: `Hello ${payload.Name}!`,
          db: NameModel.get(),
          fs: createdFile,
          debug: debug,
        }).send();
      });
    });
  }

  /**
   * Saves request payload into system fs (it can be also saved into public and temp fs)
   *
   * @param {Object} payload
   * @param {Function} callback
   */
  persistPayloadInFs(payload, callback) {
    let fs = this.kernel.get('fs');

    let fileName = `request_payload_${(new Date()).toISOString()}`;

    fs.system.writeFile(fileName, JSON.stringify(payload), (error) => {
      error ? callback(error, null) : callback(null, fileName);
    });
  }

  /**
   * Saves request payload into DB
   *
   * @param {Object} payload
   * @param {Function} callback
   */
  persistPayloadInDb(payload, callback) {
    let db = this.kernel.get('db');

    db.get('Name').createItem(payload, (error, NameModel) => {
      error ? callback(error, null) : callback(null, NameModel);
    });
  }
}