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
    put: (params) => awsRequest('putObject', params),

    get: (params) => awsRequest('getObject', params),

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
