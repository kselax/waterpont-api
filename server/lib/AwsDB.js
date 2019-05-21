const Config = require('config')
var AWS = require('aws-sdk');

const options = {
  apiVersion: Config.AWSDB.apiVersion,
  region: Config.AWSDB.region,
  endpoint: Config.AWSDB.endpoint,
  accessKeyId: Config.AWSDB.accessKeyId,
  secretAccessKey: Config.AWSDB.secretAccessKey,
}


class DynamoDB {
  constructor() {
    
    this.dynamodb = null
    this.docClient = null
    this.table = 'clients'
    
    this.setOptions(options)
  }
  setOptions(options) {
    this.dynamodb = new AWS.DynamoDB(options);
    this.docClient = new AWS.DynamoDB.DocumentClient(options)
  }
}

module.exports = new DynamoDB