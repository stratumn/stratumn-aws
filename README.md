# stratumn-aws

AWS helper to be used in a Stratumn Agent

## Installation

```
npm install --save stratumn-aws
```

## Usage

Setup your credentials:

```bash
stratumn-set-config myApp AWS_ACCESS_KEY=<mykey> AWS_SECRET_KEY=<mysecret> AWS_REGION=<myregion> AWS_BUCKET=<mybucket>
```

In your agent:

```javascript
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
```

## Credits
[Stratumn Team](https://github.com/stratumn/)

## License

MIT
