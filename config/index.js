/**
 * custom-localhost will be created as /etc/hosts/ entry inside containers
 * check docker-compose.yml
 */
module.exports = {
  database: 'auditLogging', // mongodb database
  kafkaHost: 'localhost:9092', // kafka connection url
  mongodbConnectionUrl: 'mongodb://localhost:27017/',
  kafkaTopic: 'audit-logging'
};
