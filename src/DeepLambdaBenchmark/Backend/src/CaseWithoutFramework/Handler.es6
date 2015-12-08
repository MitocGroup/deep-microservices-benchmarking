'use strict';

import aws from 'aws-sdk';

export default class {
  /**
   * @param config
   * @param event
   * @param context
   */
  constructor(config, event, context) {
    this._config = config;
    this._event = event;
    this._context = context;
  }

  run() {
    let debug = this._context.hasOwnProperty('debug') ? this._context.debug : {};
    let payload = {
      Name: this._event.hasOwnProperty('Name') ? this._event.Name : 'World'
    };
    let errors = {};

    let startWriteToFs = new Date().getTime();

    this.persistPayloadInFs(payload, (error, createdFile) => {
      let stopWriteToFs = new Date().getTime();

      debug.writeToS3 = stopWriteToFs - startWriteToFs;

      if (error) {
        errors.writeToS3 = error;
      }

      let startWriteToDb = new Date().getTime();

      this.persistPayloadInDb(payload, (error, insertedItem) => {
        let stopWriteToDb = new Date().getTime();

        if (error) {
          errors.writeToDb = error;
        }

        debug.writeToDb = stopWriteToDb - startWriteToDb;

        this._context.succeed({
          msg: `Hello ${payload.Name}!`,
          errors: errors,
          db: insertedItem,
          fs: createdFile,
          debug: debug,
        });
      });
    });
  }

  /**
   * Saves request payload into system fs
   *
   * @param {Object} payload
   * @param {Function} callback
   */
  persistPayloadInFs(payload, callback) {
    let s3 = new AWS.S3();
    let bucketName = `${this._config.buckets.system}/${this._config.microserviceIdentifier}`;

    let params = {
      Bucket: this._config.buckets.system,
      Key: `request_payload_${(new Date()).toISOString()}`,
      Body: JSON.stringify(payload)
    };

    s3.putObject(params, (error, data) => {
      if (error) {
        callback(`Error on writing to ${bucketName} S3. ${error.message}`, null);
      } else {
        callback(null, data);
      }
    });
  }

  /**
   * Saves request payload into DB
   *
   * @param {Object} payload
   * @param {Function} callback
   */
  persistPayloadInDb(payload, callback) {
    let dynamoDb = new AWS.DynamoDB();
    let tableName = this._config.tablesNames.Name;

    let params = {
      TableName: tableName,
      Item: payload,
    };

    dynamoDb.putItem(params, (error, data) => {
      if (error) {
        callback(`Error on writing to ${tableName} table. ${error.message}`, null);
      } else {
        callback(null, data);
      }
    });
  }
}