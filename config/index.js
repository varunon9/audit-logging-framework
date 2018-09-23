module.exports = {
  database: 'auditLogging', // mongodb database
  kafkaHost: 'localhost:9092', // kafka connection url
  zookeeperConnectionString: 'localhost:2181',
  mongodbConnectionUrl: 'mongodb://localhost:27017/',
  kafkaTopic: 'test-kafka'//'audit-logging'
};
