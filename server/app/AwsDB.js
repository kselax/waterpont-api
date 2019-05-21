var AWS = require('aws-sdk');

class DynamoDB {
  constructor() {
    this.dynamodb = null
    this.docClient = null
  }
  setOptions(options) {
    this.dynamodb = new AWS.DynamoDB(options);
    this.docClient = new AWS.DynamoDB.DocumentClient(options)
  }
}

module.exports = new DynamoDB