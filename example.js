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

const AWSHelper = require('stratumn-aws');

module.exports = {
  getPutUrl: data => {
    const params = { Key: data.name, ContentType: data.type };

    AWSHelper(this).put(params)
      .then(url => {
        this.state.putUrl = url;
        this.append();
      })
      .catch(this.reject);
  },
  getUrl: data => {
    AWSHelper(this).get({ Key: data.name })
    .then(url => {
      this.state.url = url;
      this.append();
    })
    .catch(this.reject);
  },
  readHash: data => {
    AWSHelper(this).readHash({ Key: data.name })
      .then(hash => {
        this.state.fileHash = hash.digest('hex');
        this.append();
      })
      .catch(this.reject);
  }
};
