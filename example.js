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
