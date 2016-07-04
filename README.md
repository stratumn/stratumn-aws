# stratumn-aws

AWS helper to be used in a Stratumn Agent

## Installation

```
npm install --save stratumn-aws
```

## Usage

In your agent:

```javascript
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
```

## Credits
[Stratumn Team](https://github.com/stratumn/)

## License

MIT
