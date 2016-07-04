const AWSHelper = require('stratumn-aws');

module.exports = {
  getUrl: data => {
    const params = { Key: data.name, ContentType: data.type };

    AWSHelper(this).put(params)
      .then(url => {
        this.state.url = url;
        this.append();
      })
      .catch(err => this.reject(err));
  }
};
