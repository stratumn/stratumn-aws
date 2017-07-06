/*
  Copyright 2017 Stratumn SAS. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const crypto = require('crypto');

module.exports = (agent) => {

  const AWS = require('aws-sdk');
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
  });
  const s3 = new AWS.S3();

  const awsRequest = (type, params) =>
    new Promise(
      (resolve, reject) => {
        const awsParams = Object.assign({ Bucket: process.env.AWS_BUCKET }, params);

        s3.getSignedUrl(type, awsParams, (err, url) => {
          if (err) {
            agent.reject(err);
            reject(err);
          } else {
            resolve(url);
          }
        });
      });

  return {
    // returns a new signed URL that can be used to upload a file
    put: (params) => awsRequest('putObject', params),

    // returns a new signed URL that can be used to read a file
    get: (params) => awsRequest('getObject', params),

    // reads the hash of a file
    readHash: (params) =>
      new Promise(
        (resolve, reject) => {
          const hash = crypto.createHash('sha256');
          const awsParams = Object.assign({ Bucket: process.env.AWS_BUCKET }, params);
          const reader = s3.getObject(awsParams, () => {}).createReadStream();

          reader.on('error', err => {
            agent.reject(err);
            reject(err);
          });

          reader.on('data', data => hash.update(data));

          reader.on('end', () => resolve(hash));
        }
      )
  };
};
