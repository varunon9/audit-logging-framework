const kafka = require('kafka-node');

const config = require('../config');
const logger = require('../modules/logger');

const client = new kafka.KafkaClient({
  kafkaHost: config.kafkaHost
});

const producer = new kafka.Producer(client);

producer.on('ready', () => {
  logger.info('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
  logger.error('producer', error);
});

const producerService = {
  sendRecord: (data, callback) => {
    const record = [
      {
        topic: config.kafkaTopic,
        messages: JSON.stringify(data),
        attributes: 1 // Use GZip compression for the payload
      }
    ];

    producer.send(record, callback);
  }
};

module.exports = producerService;
